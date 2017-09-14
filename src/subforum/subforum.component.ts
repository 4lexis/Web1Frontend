import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import { Subforum } from '../_models/subforum';
import { SubforumsService } from '../_services/subforums.service';
import { User } from '../_models/user';
import { FileUploader } from 'ng2-file-upload';
import { ThemesService } from '../_services/themes.service';

const qwe = "http://localhost:1172/api/themes/image/upload";

@Component({
    moduleId: module.id,
    templateUrl: 'subforum.component.html'
})

export class SubForumComponent implements OnInit {
    model: any = {};    
    returnUrl: string;    
    sub: Subforum;
    public uploader = new FileUploader("");

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private forumService: SubforumsService,
        private themesService:ThemesService,
        private alertService: AlertService) 
        {
            this.uploader = new FileUploader({ url: qwe});
        }

    ngOnInit() {
        this.sub = new Subforum();
        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            if(response != null)
            {
                this.sub.Image = JSON.parse(response);
                this.alertService.success('Picture uploaded');
            }
        }
    }

    upload(param)
    {
        param.withCredentials = false;
        param.upload();
    }

    post()
    {
        this.sub.Name = this.model.name;
        this.sub.Description= this.model.description;
        this.sub.Rules=this.model.rules;
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
