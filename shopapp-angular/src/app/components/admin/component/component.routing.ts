import { Routes } from '@angular/router';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';

import { NgbdDropdownBasicComponent } from './orders/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './users/nav.component';
import { BadgeComponent } from './badge/badge.component';
import { NgbdButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { OrderDetailsComponent } from './order-details/order.details.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewProductComponent } from './new-product/new-product.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'table',
				component: TableComponent
			},
      {
        path: 'categories',
				component: CategoriesComponent
      },
			{
				path: 'card',
				component: CardsComponent
			},
			{
				path: 'pagination',
				component: NgbdpaginationBasicComponent
			},
			{
				path: 'badges',
				component: BadgeComponent
			},
			{
				path: 'alert',
				component: NgbdAlertBasicComponent
			},
			{
				path: 'dropdown',
				component: NgbdDropdownBasicComponent
			},
			{
				path: 'nav',
				component: NgbdnavBasicComponent
			},
			{
				path: 'buttons',
				component: NgbdButtonsComponent
			},
      {
        path: 'edit-product/:id',
        component: EditProductComponent
      },
      {
        path: 'order-details/:id',
        component: OrderDetailsComponent
      },
      {
        path: 'new-product',
        component: NewProductComponent
      }
		], canActivate: [AdminGuard]
	}
];
