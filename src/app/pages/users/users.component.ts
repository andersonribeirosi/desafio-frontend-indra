import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FuelService } from 'src/app/services/fuel.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  user = {} as User;
  users: User[];

  constructor(private fuelService: FuelService, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  goToUsers() {
    this.router.navigateByUrl('/historico');
  }

  getUsers() {
    this.fuelService.getUsers().subscribe((users: any) => {
      this.users = users;
      console.log(users);
    });
  }

  saveUser(form: NgForm) {
    if (this.user.id !== undefined) {
      this.fuelService.updateUser(this.user).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.fuelService.saveUser(this.user).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // deleta um usuario
  deleteUser(user: User) {
    this.fuelService.deleteUser(user).subscribe(() => {
      this.getUsers();
    });
  }

  // Pega os dados para serem editados.
  editUser(user1: User) {
    this.user = { ...user1 };
  }

  // Atualiza a página
  reloadPage() {
    location.reload();
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getUsers();
    form.resetForm();
    this.user = {} as User;
  }
}
