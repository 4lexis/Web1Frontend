import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import { Subforum } from '../_models/subforum';
import { SubforumsService } from '../_services/subforums.service';
import { User } from '../_models/user';

@Component({
    moduleId: module.id,
    templateUrl: 'subforum.component.html'
})

export class SubForumComponent implements OnInit {
    model: any = {};    
    returnUrl: string;    
    sub: Subforum;    

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private forumService: SubforumsService,
        private alertService: AlertService) { }

    ngOnInit() {

    }
    
    post()
    {
        debugger
        
        this.sub = new Subforum();
        this.sub.Name = this.model.name;
        this.sub.Description= this.model.description;
        this.sub.Rules=this.model.rules;        
        this.sub.Image='img';
        let user = JSON.parse(sessionStorage.getItem('user'));
        this.sub.ResponsibleModerator_Id = user.Id;

        this.forumService.create(this.sub)
            .subscribe(
                data => {
                    this.alertService.success('Posted sub forum successfully', true);
                    this.router.navigate(['/home']);
                },
                error => {
                    this.alertService.error('Error while posting sub forum, empty field or name wasnt unique');
                });        
    }
}
