import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AddComponent} from './add/add.component';
import {DevComponent} from './dev/dev.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'add', component: AddComponent},
  { path: 'failed', component: DevComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
