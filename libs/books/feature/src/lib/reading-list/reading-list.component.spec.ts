import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tmo/shared/testing';
import { MatSnackBarHarness } from '@angular/material/snack-bar/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { HarnessLoader } from '@angular/cdk/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let loader: HarnessLoader;
  const options = {      
    message: "Book is being removed from Reading List",
    action: "Undo",
    options: {
      duration: 5000,
      verticalPosition: 'top'
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, MatSnackBarModule, NoopAnimationsModule, SharedTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should load harness for snack-bar', async () => {
    const snackBarRef = component.openSnackBar(options);
    let snackBar = await loader.getAllHarnesses(MatSnackBarHarness);

    expect(snackBar.length).toBe(1);

    snackBarRef.dismiss();
    snackBar = await loader.getAllHarnesses(MatSnackBarHarness);

    expect(snackBar.length).toBe(0);
  });
});
