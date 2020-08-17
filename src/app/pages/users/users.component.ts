import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  user = {} as User;
  users: User[];
  constructor(private userService: HistoryService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((users: any) => {
      this.users = users;
      console.log(users);
    });
  }
}
