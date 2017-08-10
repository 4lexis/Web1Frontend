import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import { User} from '../_models/'
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    user: User;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    ngOnInit() {

    }

    login() 
    {   
             this.loading = true;
             this.userService.login(this.model.username, this.model.password).then( user => 
             {
                 this.user = user;

                 sessionStorage.setItem("user", JSON.stringify(this.user));

                 this.alertService.success("Login sucessful.");
                 this.loading = false;
                 this.router.navigate(['/home']);
             }
             ).catch(throwable => {this.alertService.error("User not found!");
            this.loading = false;})
                 
    }

}
