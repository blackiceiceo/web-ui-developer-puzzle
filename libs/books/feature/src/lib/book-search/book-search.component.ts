import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks,
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map ,takeUntil} from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { Book, ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookSearchComponent implements OnInit, OnDestroy{

  private destroy: ReplaySubject<ReadingListBook> = new ReplaySubject<ReadingListBook>();

  books: ReadingListBook[];

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {

    this.searchForm.valueChanges.pipe(map(val => val.term),debounceTime(500), distinctUntilChanged(),
    takeUntil(this.destroy)).subscribe( () => {
      this.searchBooks();
      this.cdr.detectChanges();
    });

    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
  }

  addBookToReadingList(book: Book): void {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample(): void {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks(): void {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
