import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FuelService } from 'src/app/services/fuel.service';
import { Fuel } from 'src/app/models/fuel';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  user = {} as User;
  users: User[];
  history = {} as Fuel;
  histories: Fuel[];

  constructor(
    private userService: FuelService,
    private historyService: FuelService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((users: any) => {
      this.users = users;
      console.log(users);
    });
  }

  // defini se um carro será criado ou atualizado
  saveFuel(form: NgForm) {
    if (this.history.id !== undefined) {
      this.historyService.updateFuel(this.history).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.historyService.saveFuel(this.history).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obter todos os combustiveis
  getFuels() {
    this.historyService.getFuels().subscribe((histories: any) => {
      this.histories = histories;
    });
  }

  reloadPage() {
    location.reload();
  }

  // deleta um carro
  deleteFuel(fuel: Fuel, form: NgForm) {
    this.historyService.deleteFuel(fuel).subscribe(() => {
      this.getFuels();
    });
  }

  // Pega os dados para serem editados.
  editFuel(fuel: Fuel) {
    this.history = { ...fuel };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getFuels();
    form.resetForm();
    this.history = {} as Fuel;
  }
}
