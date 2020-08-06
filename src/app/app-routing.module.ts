import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserService } from './user.service';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { DetailComponent } from './pages/detail/detail.component';
import { CreateComponent } from './pages/create/create.component';
import { ProductListComponent } from './pages/product-list/product-list.component';



const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
	{path: 'home', component: HomePageComponent},
  {path: 'detail', component: DetailComponent},
  {path: 'create', component: CreateComponent},
  {path: 'productList', component: ProductListComponent, canActivate: [UserService]},
	{path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
