import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { InlineEditorComponent } from 'ng2-inline-editor';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';

@Component({
  moduleId: module.id,
  templateUrl: './userroles.component.html'
})

export class UserRolesComponent implements OnInit {

  model: any = {};
  users: Array<User>;
  editableSelectOptions =[
    {value: 0, text: 'Admin'},
    {value: 1, text: 'Moderator'},
    {value: 2, text: 'Regular'}
  ];

  constructor(
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService
      .getAll()
      .then(users => {
        this.users = users;       
      })
  }

  onSave(user: User) {      
    this.userService.update(user)
      .subscribe(
      data => {
        this.alertService.success('User edited successfully', true);
      },
      error => {
        this.alertService.error(error);
      });
  }



}