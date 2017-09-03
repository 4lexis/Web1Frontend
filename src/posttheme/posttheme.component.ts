import { Component, OnInit, ElementRef, Input, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import { Subforum } from '../_models/subforum';
import { SubforumsService } from '../_services/subforums.service';
import { User } from '../_models/user';
import { ThemesService } from '../_services/themes.service';
import { Theme } from '../_models/theme';

@Component({
    moduleId: module.id,
    templateUrl: 'posttheme.component.html'
})

export class PostThemeComponent implements OnInit {
    model: any = {};      
    // @Input() multiple: boolean = false;
    // @ViewChild('fileInput') inputEl: ElementRef;
    typeTheme: string;    

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private themeService: ThemesService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.typeTheme="Text";
    }
    onChange(deviceValue)
    {        
        this.typeTheme = deviceValue;
    }
    
    postTheme()
    {        
        var thema = new Theme();
        var auth = JSON.parse(sessionStorage.getItem("user"));
        thema.Author_Id = auth.Id;
        thema.SubForum_Id = Number(sessionStorage.getItem("subforumId"));
        thema.Likes = 0;
        thema.Dislikes = 0;
        thema.CreationDate = new Date();        
        thema.Title = this.model.title;
        
        var select_value = (<HTMLInputElement>document.getElementById('select')).value;
        if(select_value == "Text")
        {
            debugger
            thema.Text = this.model.content;
            thema.Link = null;
            thema.Image = null;
        }
        else if(select_value == "Link")
        {
            thema.Text = null;
            thema.Link = this.model.content;
            thema.Image = null;
        }
        else //image
        {
            // thema.Text = null;
            // thema.Link = null;
            // debugger
            // let inputEl: HTMLInputElement = this.inputEl.nativeElement;
            // let fileCount: number = inputEl.files.length;
            // let formData = new FormData();
            // //thema.Image = "pic/" + inputEl.files.item(0).name;
            // formData.append('file',inputEl.files.item(0));
            // var options = { content: formData };

            // //poziv servisa
            // this.themeService.uploadPic(options)
            // .subscribe(
            //     data => {
            //         this.alertService.success('Picture uploaded', false);                
            //     },
            //     error => {
            //         this.alertService.error('Error while posting picture');
            //     });             
        }

        this.themeService.create(thema)
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

}
