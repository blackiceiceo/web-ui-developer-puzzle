import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, addToReadingList, markedAsFinishedReading, resetUpdateMarkedAsFinished } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);
  checked: Boolean;

  constructor(
    private readonly store: Store,
    private readonly snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  onFinishedBook(item) {
    this.store.dispatch(markedAsFinishedReading({item}));
  }

}
