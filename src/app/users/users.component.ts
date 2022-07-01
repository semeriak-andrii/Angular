import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { firstValueFrom } from 'rxjs';
import { User } from './user';
import { UsersApiService } from './users-api.service';
import { UsersService } from './users.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  sortOptions = ['name', 'username'];

  users: User[] = [];

  initialUsers: User[] = [];

  disabled = true;

  isAllSelected = false;

  searchInput = '';

  isDeleting = false;
  firstNameUser: string | undefined;
  lastNameUser: string | undefined;
  phoneUser: string | undefined;
  emailUser: string | undefined;

  constructor(
    private usersService: UsersService,
    private usersApiService: UsersApiService
  ) { }

  ngOnInit(): void {
    this.usersApiService.getUsers().subscribe(users => {
      this.users = users;
      this.initialUsers = users;
    });
  }

  enabled(): boolean {
    return this.users.some(user => user.isSelected);
  }

  onSelectAllClick(): void {
    this.isAllSelected = !this.isAllSelected;
    this.users.forEach(user => user.isSelected = this.isAllSelected);
  }

  onDeleteClick(): void {
    const selectedIndexes: any[] = [];
    this.users.forEach((user, index) => {
      if (user.isSelected) {
        selectedIndexes.push(index);
      }
    });
    Promise.all(selectedIndexes.map(index => firstValueFrom(this.usersApiService.deleteUser(this.users[index].id)))).then(() => {
      selectedIndexes.reverse().forEach(index => this.users.splice(index, 1));
    })
  }

  onSortSelect(event: MatSelectChange): void {
    const selectedOption = event.value as keyof User;
    this.users.sort((a, b) => a[selectedOption] < b[selectedOption] ? -1 : 1);
  }

  onSearch(): void {
    this.users = this.initialUsers.filter(user => {
      return Object.keys(user).some(key => `${user[key as keyof User]}`.toLowerCase().includes(this.searchInput));
    });
  }

  onAddUserClick(): void {
    this.usersApiService.addUser({
      name: this.firstNameUser,
      username: this.lastNameUser,
      phone: this.phoneUser,
      email: this.emailUser
    }).subscribe(newUser => {
      this.users.push(newUser);
    });
    this.firstNameUser=''
    this.lastNameUser =''
    this.phoneUser =''
    this.emailUser =''
  }

  onDeleteUserClick(id: number, i: number): void {
    this.isDeleting = true;
    this.usersApiService.deleteUser(id).subscribe(res => {
      this.users.splice(i, 1);
      this.isDeleting = false;
    });
  }
}
