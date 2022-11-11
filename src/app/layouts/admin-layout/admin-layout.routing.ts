import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { StoreComponent } from '../../pages/store/store.component';
import { AddStoreComponent } from '../../pages/add-store/add-store.component';
import { ProductsComponent } from '../../pages/products/products.component';
import { CategoryComponent } from '../../pages/products/category/category.component';
import { PartnersComponent } from '../../pages/partners/partners.component';
import { OrdersComponent } from '../../pages/orders/orders.component';
import { CustomersComponent } from '../../pages/customers/customers.component';
import { StoreDetailsComponent } from '../../pages/store-details/store-details.component';
import { StaffComponent } from '../../pages/staff/staff.component';
import { AddStaffComponent } from '../../pages/staff/add-staff/add-staff.component';
import { ProfileComponent } from '../../pages/staff/profile/profile.component';
import { AddProductComponent } from '../../pages/products/add-product/add-product.component';
import { ImportProductComponent } from '../../pages/inventory-manager/import-product/import-product.component';
import { InventoryComponent } from '../../pages/inventory-manager/inventory/inventory.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'chain-store',      component: StoreComponent},
    { path: 'products',      component: ProductsComponent},
    { path: 'staff',      component: StaffComponent},
    { path: 'products/category',      component: CategoryComponent},
    { path: 'products/:idcategory/add-product',      component: AddProductComponent},
    { path: 'partners',      component: PartnersComponent},
    { path: 'oders',      component: OrdersComponent},
    { path: 'customers',      component: CustomersComponent},
    { path: 'chain-store/add-store',      component: AddStoreComponent},
    { path: 'chain-store/detail/:id',      component: StoreDetailsComponent},
    { path: 'chain-store/detail/:id/import',      component: ImportProductComponent},
    { path: 'chain-store/detail/:id/inventory',      component: InventoryComponent},
    { path: 'chain-store/detail/:idstore/:idstaff',      component: ProfileComponent},
    { path: 'chain-store/detail/:id/add-staff/:ismanager',      component: AddStaffComponent},

];
