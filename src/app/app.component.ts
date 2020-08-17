import { Component, OnInit } from '@angular/core';
import { FuelService } from './services/fuel.service';
import { Fuel } from './models/fuel';
import { NgForm } from '@angular/forms';
import { User } from './models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
