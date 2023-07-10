import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {TodoPageComponent} from "./pages/todo-page/todo-page.component";

const routes: Routes = [
  {path: 'todos/:id', component: TodoPageComponent},
  {path: '', pathMatch: 'full', component: HomePageComponent},
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
