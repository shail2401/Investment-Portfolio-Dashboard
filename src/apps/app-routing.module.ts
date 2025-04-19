import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './pages/sales/sales.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { HealthComponent } from './pages/health/health.component';

const routes: Routes = [
  {
    path: 'sales',
    component: SalesComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'health',
    component: HealthComponent,
  },
  {
    path: '', redirectTo: 'sales', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
