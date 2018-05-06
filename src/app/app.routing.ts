import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
//Components
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { IncomeComponent } from './components/income/income.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { AddIncomeComponent } from './components/add-income/add-income.component';
// import { AuthenticationGuard } from './guards/authentication.guard'

const appRoutes: Routes = [
    { path:'', component: HomeComponent },
    // { path:'login', component: LoginComponent },
    { path:'home', component: HomeComponent},
    { path:'Productos', component: ProductComponent},
    { path:'Calendario', component: CalendarComponent},
    { path:'Ingresos', component: IncomeComponent},
    { path:'Ingresos/Agregar', component: AddIncomeComponent},
    { path:'Ingresos/Agregar/:id', component: AddIncomeComponent},
    { path:'Egresos', component: ExpensesComponent},
    { path:'Egresos/Agregar', component: AddExpenseComponent},
    { path:'Egresos/Agregar/:id', component: AddExpenseComponent},
    { path:'**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);