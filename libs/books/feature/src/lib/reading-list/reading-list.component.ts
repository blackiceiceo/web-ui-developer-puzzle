import { Component , ChangeDetectionStrategy} from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, addToReadingList} from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(
    private readonly store: Store,
    private readonly snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));

    this.openSnackBar({
      message: "Book is being removed from Reading List",
      action: "Undo",
      options: {
        duration: 5000,
        verticalPosition: 'top'
      }
    }).onAction().subscribe(() => {
      this.store.dispatch(addToReadingList({book: item}));
    });
    
  }

  openSnackBar(option: any) {
    const { message, action, options } = option;
    return this.snackBar.open(message, action, options);
  }
}