import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';
import { MatSnackBarModule} from '@angular/material/snack-bar'
import { MatSnackBarHarness } from '@angular/material/snack-bar/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { HarnessLoader } from '@angular/cdk/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';


describe('BookSearchListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let loader: HarnessLoader;
  let options = {      
    message: "Book is being added to Reading List",
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
    fixture = TestBed.createComponent(BookSearchComponent);
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