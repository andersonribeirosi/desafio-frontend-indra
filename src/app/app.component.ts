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
  history = {} as Fuel;
  histories: Fuel[];

  user = {} as User;
  users: User[];

  constructor(private fuelService: FuelService, private router: Router) {}

  ngOnInit() {
    this.getFuels();
  }

  // Define se um combustível será criado ou atualizado
  saveFuel(form: NgForm) {
    if (this.history.id !== undefined) {
      this.fuelService.updateFuel(this.history).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.fuelService.saveFuel(this.history).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obter todos os combustiveis
  getFuels() {
    this.fuelService.getFuels().subscribe((histories: any) => {
      this.histories = histories;
    });
  }

  // deleta um combustível
  deleteFuel(fuel: Fuel) {
    this.fuelService.deleteFuel(fuel).subscribe(() => {
      this.getFuels();
    });
  }

  // Pega os dados para serem editados.
  editFuel(fuel: Fuel) {
    this.history = { ...fuel };
  }

  // Atualiza a página
  reloadPage() {
    location.reload();
  }

  goToUsers() {
    this.router.navigateByUrl('/user');
  }

  getUsers() {
    this.fuelService.getUsers().subscribe((users: any) => {
      this.users = users;
      console.log(users);
    });
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getFuels();
    form.resetForm();
    this.history = {} as Fuel;
  }
}
