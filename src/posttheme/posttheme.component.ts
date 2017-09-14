import { Component, OnInit, ElementRef, Input, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import { Subforum } from '../_models/subforum';
import { SubforumsService } from '../_services/subforums.service';
import { User } from '../_models/user';
import { ThemesService } from '../_services/themes.service';
import { Theme } from '../_models/theme';
import { FileUploader } from 'ng2-file-upload';
import { Message } from '../_models/message';

const qwe = "http://localhost:1172/api/themes/image/upload";

@Component({
    moduleId: module.id,
    templateUrl: 'posttheme.component.html'
})

export class PostThemeComponent implements OnInit {

    model: any = {};
    typeTheme: string;    
    uploadedFiles: any[] = [];
    public uploader = new FileUploader("");
    thema = new Theme();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private themeService: ThemesService,
        private alertService: AlertService) 
        {             
             this.uploader = new FileUploader({ url: qwe}); 
        }

    ngOnInit() {        
        this.typeTheme="Text";
        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        if(response != null)
        {
            this.thema.Image = JSON.parse(response);
            this.alertService.success('Picture uploaded');
        }
        };
                    
    }
    onChange(deviceValue)
    {        
        this.typeTheme = deviceValue;
    }
    
    postTheme()
    {        
        
        var auth = JSON.parse(sessionStorage.getItem("user"));
        this.thema.Author_Id = auth.Id;
        this.thema.SubForum_Id = Number(sessionStorage.getItem("subforumId"));
        this.thema.Likes = 0;
        this.thema.Dislikes = 0;
        this.thema.CreationDate = new Date();        
        this.thema.Title = this.model.title;
        
        var select_value = (<HTMLInputElement>document.getElementById('select')).value;
        if(select_value == "Text")
        {
            this.thema.Text = this.model.content;
            this.thema.Link = null;
            this.thema.Image = null;
        }
        else if(select_value == "Link")
        {
            this.thema.Text = null;
            this.thema.Link = this.model.content;
            this.thema.Image = null;
        }
        else //image
        {
             this.thema.Text = null;
             this.thema.Link = null;            
        }

        this.themeService.create(this.thema)
            .subscribe(
                data => {                    
                    this.alertService.success('New theme posted successful', true);
                    this.router.navigate(['/themes']);
                },
                error => {
                    debugger
                    this.alertService.error('Error while posting new theme, empty field or name wasnt unique');
                });
    }

    upload(param)
    {
        param.withCredentials = false;
        param.upload();
    }    

}
