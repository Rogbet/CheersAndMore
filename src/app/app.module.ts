import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing, appRoutingProviders} from './app.routing'; 
import { Ng2OrderModule } from 'ng2-order-pipe';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { DropdownModule, InputTextModule, InputMaskModule, CheckboxModule, DialogModule, ButtonModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { LOCALE_ID } from '@angular/core';

import { MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
  } from '@angular/material';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import { HomeComponent } from './components/home/home.component';
import { ProductComponent, DialogOverviewExampleDialog } from './components/product/product.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CalendarComponent } from './components/calendar/calendar.component';

import { ProductService } from './services/product.service';
import { ContainerComponent } from './components/container/container.component';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { AddProductComponent } from './components/add-product/add-product.component';
import { FileSizePipe } from './pipes/file-size.pipe';
import { SnackbarService } from './services/snackbar.service';
import { IncomeComponent } from './components/income/income.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { AddIncomeComponent } from './components/add-income/add-income.component';
import { ExpensesService } from './services/expenses.service';
import { IncomeService } from './services/income.service';
import { registerLocaleData } from '@angular/common';
import localeMx from '@angular/common/locales/es-mx';

registerLocaleData(localeMx);
  @NgModule({
    exports: [
      MatAutocompleteModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatStepperModule,
      MatDatepickerModule,
      MatDialogModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      TableModule,
      DialogModule,
      ButtonModule
    ],
  })
  export class MaterialModule {}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    LoginComponent,
    HeaderComponent,
    SidenavComponent,
    CalendarComponent,
    ContainerComponent,
    DropZoneDirective,
    AddProductComponent,
    FileSizePipe,
    IncomeComponent,
    ExpensesComponent,
    DialogOverviewExampleDialog,
    AddExpenseComponent, 
    AddIncomeComponent
  ],
  imports: [
    MatButtonModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    Ng2OrderModule,
    ReactiveFormsModule,
    routing,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [
    ProductService,
    ExpensesService,
    IncomeService,
    SnackbarService,
    {
      provide: MAT_DATE_LOCALE, useValue: 'es-MX',
    },
    {
      provide: LOCALE_ID, useValue: "es-MX"
    }
  ],
  entryComponents: [DialogOverviewExampleDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
