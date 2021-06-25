## Code Review:
1. Change the 'Change detection startegy' to onPush to avoid dirty checking and increase perferomance so that the whole component code will not run on every change.
2. Change to correct tags when using titles, headers, subtitles, etc.
3. Remove subscription for books for retreiving books and instead use async pipe.
4. In reading-list.reducer.ts file, should change to 'confirmedAddtoReadingList' and 'confirmedRemoveFromReadingList' instead of using 'addToReadingList' and 'removeFromReadingList'.

## Lighthouse:
1. The search button doees not have an accessible name.
2. Contrast issue with 'Reading List Button' and the <p> tag in the 'searching for a topic'.

## Manual Accessibility Check:
1. The page needs to have a logical tab order.
2. Make sure custom controls have associated labels.
3. Offscreen items are hidden from the view.
