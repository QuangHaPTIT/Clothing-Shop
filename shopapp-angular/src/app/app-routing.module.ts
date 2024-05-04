import { NgModule, importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {
  DetailProductComponent
} from './components/detail-product/detail-product.component';
import { OrderComponent } from './components/order/order.component';
import {
  OrderDetailComponent
} from './components/order-confirm/order.detail.component';
import { AuthGuard } from './guards/auth.guard';
import { UserProfileComponent } from './components/user-profile/user.profile.component';
import { ChatComponent } from './components/chat/chat.component';
import { FullComponent } from './components/admin/layouts/full/full.component';
import { AdminGuard } from './guards/admin.guard';
import { MyOrderComponent } from './components/my-order/my.order.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products/:id', component: DetailProductComponent },
  { path: 'orders', component: OrderComponent, canActivate: [AuthGuard]},
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'orders/:id', component: OrderDetailComponent },
  {path: 'chat/:userId', component: ChatComponent, canActivate: [AuthGuard]},
  {path: 'my-order', component: MyOrderComponent, canActivate: [AuthGuard]},
  {
    path: '',
    component: FullComponent,
    children: [
      { path: 'admin', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./components/admin/dashboard-components/dashboard.module').then(m => m.DashboardModule),

      },
      {
        path: 'about',
        loadChildren: () => import('./components/admin/about/about.module').then(m => m.AboutModule),
      },
      {
        path: 'component',
        loadChildren: () => import('./components/admin/component/component.module').then(m => m.ComponentsModule),
      }
    ], canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// {
//   path: '',
//   component: FullComponent,
//   children: [
//     { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
//     {
//       path: 'dashboard',
//       loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
//     },
//     {
//       path: 'about',
//       loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
//     },
//     {
//       path: 'component',
//       loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
//     }
//   ]
// },
