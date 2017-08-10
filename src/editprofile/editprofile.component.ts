import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import { User } from '../_models/'
@Component({
    moduleId: module.id,
    templateUrl: 'editprofile.component.html'
})

export class EditProfileComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    user: User;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
         }

    ngOnInit() {
   
        this.user = JSON.parse(sessionStorage.getItem("user"));

        if (this.user != undefined) {
            this.model.firstName = this.user.Name;
            this.model.lastName = this.user.LastName;
            this.model.username = this.user.Username;
            this.model.password = this.user.Password;
            this.model.phone = this.user.Phone;
            this.model.email = this.user.Email;
        }
    }

    editData()
    {
        this.user.Name = this.model.firstName;
        this.user.LastName = this.model.lastName;
        this.user.Username = this.model.username;
        this.user.Password = this.model.password;
        this.user.Phone = this.model.phone;
        this.user.Email = this.model.email;

        this.userService.update(this.user).subscribe(
                data => {
                    this.alertService.success('Edit sucessful.', true);
                    sessionStorage.setItem("user", JSON.stringify(this.user));
                    this.router.navigate(['/home']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    

}
