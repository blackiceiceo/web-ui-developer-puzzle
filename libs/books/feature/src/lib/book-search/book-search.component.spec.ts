import { async, ComponentFixture, TestBed, tick, fakeAsync, discardPeriodicTasks } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createBook, SharedTestingModule } from '@tmo/shared/testing';
import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { 
  addToReadingList,
  searchBooks,
  getAllBooks,
  getBooksError,
  getBooksLoaded,
} from '@tmo/books/data-access'
import { By } from '@angular/platform-browser';
import { dispatch } from 'rxjs/internal/observable/pairs';

describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let dispatchSpy;
  let store: MockStore

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule],
      providers: [provideMockStore()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    dispatchSpy = jest.spyOn(store, 'dispatch');
    store.overrideSelector(getAllBooks, [
      {...createBook('A'), isAdded: false},
      {...createBook('AB'), isAdded: false}
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should call dispatch action searchBooks after 500ms when the term is changed and not before', fakeAsync(() => {
    component.searchForm.setValue({term: 'A'});
    tick(300);
    expect(dispatchSpy).not.toHaveBeenCalled();
    component.searchForm.setValue({term: 'AB'});
    tick(500);
    expect(dispatchSpy).toHaveBeenCalledWith(searchBooks({term: 'AB'}));
  }));

  it('should show a list of books when the user is typing', fakeAsync(() => {
    component.searchForm.setValue({term: 'A'});
    tick(500);
    expect(dispatchSpy).toHaveBeenCalledWith(searchBooks({term: 'A'}));

    expect(component.books.length).toEqual(2);
  }));

});
