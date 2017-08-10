import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import { User } from '../_models';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        var tempUser = new User();

        tempUser.Name = this.model.firstName;
        tempUser.LastName = this.model.lastName;
        tempUser.Username = this.model.username;
        tempUser.Password = this.model.password;
        tempUser.Phone = this.model.phone;
        tempUser.Role = 3;
        tempUser.RegistrationTime = new Date();
        tempUser.Email = this.model.email;

        this.userService.create(tempUser)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
