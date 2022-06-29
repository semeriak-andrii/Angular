import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { User } from './user';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  sortOptions = ['firstname', 'lastname'];

  users: User[] = [];

  initialUsers: User[] = [];

  disabled = true;

  isAllSelected = false;

  searchInput = '';

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.users = this.usersService.getMockedUsers();
    this.initialUsers = this.usersService.getMockedUsers();
  }

  dasabled(): boolean {
    this.users.forEach(user => { if (user.isSelected) { this.disabled = false } });
    return this.disabled
  }

  onSelectAllClick(): void {
    this.isAllSelected = !this.isAllSelected;
    this.users.forEach(user => user.isSelected = this.isAllSelected);
  }

  onDeleteClick(): void {
    this.users = this.users.filter(user => !user.isSelected);
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
}
