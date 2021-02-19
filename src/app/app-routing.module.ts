import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastDashboardComponent } from './forecast-dashboard/forecast-dashboard.component';
import { CitiesComponent } from './cities/cities.component';

const routes: Routes = [
  {path: 'dashboard' , component: ForecastDashboardComponent},
  {path: 'cities' , component: CitiesComponent},
  { path: '',  redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
