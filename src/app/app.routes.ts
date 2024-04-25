import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { ManageProductComponent } from './pages/manage-product/manage-product.component';

export const routes: Routes = [
    {
        path: 'products',
        component: ProductsComponent,
    },
    {
        path: 'manage-product',
        component: ManageProductComponent,
    },
    {
        path: 'manage-product/:id',
        component: ManageProductComponent,
    },
    {
        path: '',
        redirectTo: '/products',
        pathMatch: 'full',
    },
];