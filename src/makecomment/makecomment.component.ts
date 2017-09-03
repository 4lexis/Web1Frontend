import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../_services/index';
import { CommentsService } from '../_services/comments.service';
import { Comment } from '../_models/comment';

@Component({
    moduleId: module.id,
    templateUrl: 'makecomment.component.html'
})

export class MakeCommentComponent implements OnInit {
    model: any = {};
    

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private commentService: CommentsService,
        private alertService: AlertService) {
         }

    ngOnInit() {
        
    }

    comment()
    {
        
        var com = new Comment();
        var themeId = JSON.parse(sessionStorage.getItem("CommentThemeId"));
        com.Likes = 0;
        com.Dislikes = 0;
        var user = JSON.parse(sessionStorage.getItem("user"));
        com.Author_Id = user.Id;
        com.Edited = false;
        com.ParentComment = null;
        com.Theme_Id = themeId;
        com.Content = this.model.content;
        com.TimeStamp = new Date();
        this.commentService.create(com)
            .subscribe(
                data => {
                    this.alertService.success('Comment submitted successfully', true);
                    this.router.navigate(['/themes']);
                },
                error => {
                    this.alertService.error('Error while posting comment');
                });
    }
    

}
