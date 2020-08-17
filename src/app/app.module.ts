import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './pages/users/users.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FuelListComponent } from './pages/fuel/fuel-list/fuel-list.component';

@NgModule({
  declarations: [AppComponent, UsersComponent, NavbarComponent, FuelListComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
