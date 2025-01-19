import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewSavedFormComponent } from './components/view-saved-form/view-saved-form.component';
import { HomeComponent } from './components/home/home.component';
import { FormsListComponent } from './components/forms-list/forms-list.component';

const routes: Routes = [
  { path: 'forms-home', component: HomeComponent },
  { path: 'view-saved-form', component: ViewSavedFormComponent },
  { path: 'forms-list', component: FormsListComponent },
  { path: '', redirectTo: 'forms-home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
