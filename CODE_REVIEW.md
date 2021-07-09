#### Code Review ####

The 'okreads' app allows a user to search for books and add them to a reading list.
The app is also desgin to allow the user to remove books from the reading list.
The application uses Angular to create a front-end experience for the user, and
NestJs to build Node.js server-side application. The application also uses NX to create
a monorepo for which both the back-end and front-end are stored, along with NGRX for creating
store that maintain the state of our data that is shared across multiple components.

## Code Smells:
1. Change the 'Change detection startegy' to onPush to avoid dirty checking and increase perferomance so that the whole component code will not run on every change.
2. Change to correct tags when using titles, headers, subtitles, etc.
3. Remove subscription for books for retreiving books and instead use async pipe.
4. In reading-list.reducer.ts file, should change to 'confirmedAddtoReadingList' and 'confirmedRemoveFromReadingList' instead of using 'addToReadingList' and 'removeFromReadingList'.
5. Give conventional naming sense from 'book--content' to 'book-content' and 'book--content--cover' to 'book-content-cover'.
6. Instead of using the date function inside of book-search-component.ts, it is better to use the Date pipe because they can be used
throughout the app.
7. Inside total-count.component.ts we should not utilize angular lifecycle hooks ( ngOnInit(): void() ) without actually using it.


## Lighthouse:
1. The search button doees not have an accessible name.
2. Contrast issue with 'Reading List Button' and the <p> tag in the 'searching for a topic'.

## Manual Accessibility Check:
1. The page needs to have a logical tab order.
2. Make sure custom controls have associated labels.
3. Offscreen items are hidden from the view.
