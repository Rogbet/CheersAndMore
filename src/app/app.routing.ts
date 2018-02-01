import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
//Components
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { CalendarComponent } from './components/calendar/calendar.component';
// import { AuthenticationGuard } from './guards/authentication.guard'

const appRoutes: Routes = [
    { path:'', component: HomeComponent },
    // { path:'login', component: LoginComponent },
    { path:'home', component: HomeComponent},
    { path:'productos', component: ProductComponent},
    { path:'calendario', component: CalendarComponent},
    { path:'**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);