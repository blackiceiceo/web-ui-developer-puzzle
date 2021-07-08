import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { createReadingListItem, SharedTestingModule } from '@tmo/shared/testing';
import { ReadingListEffects } from './reading-list.effects';
import * as ReadingListActions from './reading-list.actions';
import { ReadingListItem } from '@tmo/shared/models';

describe('ToReadEffects', () => {
  const item: ReadingListItem = createReadingListItem('A');
  let actions: ReplaySubject<any>;
  let effects: ReadingListEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        ReadingListEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(ReadingListEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('loadReadingList$', () => {
    it('should work', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.init());

      effects.loadReadingList$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.loadReadingListSuccess({ list: [] })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list').flush([]);
    });
  });

  it('should finish reading the book when click on mark as finished', done => {
    actions = new ReplaySubject();
    actions.next(ReadingListActions.markedAsFinishedReading({item}));

    const finishedBook = {
      ...item,
      finished: true,
      finishedDate: new Date().toISOString()
    };

    effects.markBookAsFinished$.subscribe(action => {
      expect(action).toEqual(ReadingListActions.confirmedMarkedAsFinishedReading({ item: finishedBook}));
      done();
    });

    httpMock.expectOne({
      url: `/api/reading-list/${item.bookId}/finished`,
      method: 'put'
    }).flush(finishedBook);
  })

  it('should throw finish reading book api error when failed to mark finish', done => {
    actions = new ReplaySubject();
    actions.next(ReadingListActions.markedAsFinishedReading({item}));

    const readingListAction = ReadingListActions.failedToMarkedAsFinished({
      item: {...item, finished: false, finishedDate: ''}
    });

    effects.markBookAsFinished$.subscribe(action =>{
      expect(action).toEqual(readingListAction);
      done();
    });

    httpMock.expectOne({
      url: `/api/reading-list/${item.bookId}/finished`,
      method: 'put'
    }).error(null);
  })

});
