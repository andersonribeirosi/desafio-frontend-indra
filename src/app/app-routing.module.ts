import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'historico', pathMatch: 'full' },
  { path: 'user', component: UsersComponent },
  { path: 'historico', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
