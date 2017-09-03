import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User, Subforum, Comment, Like, LikeComment } from '../_models';

import { AlertService, UserService, SubforumsService, ThemesService, CommentsService } from '../_services/index';
import { Theme } from '../_models/theme';

@Component({
    moduleId: module.id,
    templateUrl: 'themes.component.html'
})

export class ThemesComponent {
    subforums: Subforum[];
    user: String;
    userObject: User;
    themes: Theme[];
    loading = false;
    comments: Comment[];
    specificComments: Comment[];
    likes: Like[];
    commentLikes: LikeComment[];
    postThemeModel: any;
    role: number;

    constructor(
        private router: Router,
        private alertService: AlertService,
        private subforumService: SubforumsService,
        private themesService: ThemesService,
        private commentsService: CommentsService) { }

    ngOnInit() {        
        this.getThemesOfSubforum();
        this.getComments();
        this.getLikes();
        this.getCommentLikes();
        debugger
        var admin = JSON.parse(sessionStorage.getItem("user"));
        if(admin != null)
        {
            this.role = Number.parseInt(admin.Role);
        }
        else
        {
            this.role = 2;    
        }        
        this.user = sessionStorage.getItem("user");
        this.userObject = JSON.parse(sessionStorage.getItem("user"));
    }

    getComments() {
        this.commentsService.getAll().then(
            comments => {
                this.comments = comments;
            });

    }

    getLikes() {
        this.themesService.getLikes().then(
            likes => {
                this.likes = likes;
            });

    }

    getCommentLikes() {
        this.themesService.getCommentLikes().then(
            likes => {
                this.commentLikes = likes;
            });

    }

    collapseAll(id: number) {
        this.themes.forEach(theme => {
            if (theme.Id != id) {
                var tab = document.getElementById(theme.Id.toString());
                var comments = document.getElementById("comments" + theme.Id.toString());;
                tab.setAttribute("class", "collapse");
                comments.setAttribute("class", "collapse");
            }
        });
    }

    getSpecificComments(theme: Theme) {
        this.specificComments = this.comments.filter(c => c.Theme.Id == theme.Id);
    }

    getThemesOfSubforum() {
        this.themesService.getAll().then(
            themes => {
                this.themes = themes.filter(t => t.SubForum.Name == sessionStorage.getItem("subforum"));
            });
    }

    deleteTheme(thema:Theme)
    {        
        this.themesService.delete(thema)
        .subscribe(
                data => {
                    this.alertService.success('Theme deleted', false);
                    this.router.navigate(['/themes']);
                    this.getThemesOfSubforum();
                },
                error => {
                    this.alertService.error('Error while deleting theme');
                });
    }    

    makeComment(themeId: number)
    {
        if(sessionStorage.getItem("user") != null)
        {
            sessionStorage.setItem("CommentThemeId",themeId.toString());
            this.router.navigate(['/makecomment']);
        }
        else
        {
            this.alertService.error("You can not post comments unlogged");
        }
    }

    like(theme: Theme) {
        this.getLikes();
        debugger
        var specificLikes = this.likes.filter(like => like.User_Id == this.userObject.Id && like.Theme_Id == theme.Id);
        if (specificLikes.length == 0) {

            if (this.user != null) {

                this.themesService.update(theme).subscribe(
                    data => {

                        var like = new Like();
                        like.Theme_Id = theme.Id;
                        like.User_Id = this.userObject.Id;
                        like.IsLiked = true;

                        this.themesService.setLike(like).subscribe(
                            data => {
                                theme.Likes++;
                            },
                            error => {
                            }
                        )
                    },
                    error => {
                        this.alertService.error("Update failed.");
                    });

            }
            else {
                this.alertService.error("You are not logged in!");
            }
        }
        else {
            if (specificLikes[0].IsLiked == false) {
                specificLikes[0].IsLiked = true;
                this.themesService.updateLike(specificLikes[0]).subscribe(
                    data => {
                        theme.Likes++;
                        theme.Dislikes--;
                    },
                    error => {
                    }
                )
            }
        }
    }

    likeComment(comment: Comment) {
        this.getCommentLikes();
        debugger
        var specificLikes = this.commentLikes.filter(like => like.User_Id == this.userObject.Id && like.Comment_Id == comment.Id);
        if (specificLikes.length == 0) {

            if (this.user != null) {

                this.commentsService.update(comment).subscribe(
                    data => {

                        var like = new LikeComment();
                        like.Comment_Id = comment.Id;
                        like.User_Id = this.userObject.Id;
                        like.IsLiked = true;

                        this.themesService.setCommentLike(like).subscribe(
                            data => {
                                comment.Likes++;
                            },
                            error => {
                            }
                        )
                    },
                    error => {
                        this.alertService.error("Update failed.");
                    });

            }
            else {
                this.alertService.error("You are not logged in!");
            }
        }
        else {
            if (specificLikes[0].IsLiked == false) {
                specificLikes[0].IsLiked = true;
                this.themesService.updateCommentLike(specificLikes[0]).subscribe(
                    data => {
                        comment.Likes++;
                        comment.Dislikes--;
                    },
                    error => {
                    }
                )
            }
        }
    }

    dislikeComment(comment: Comment) {
        debugger
        this.getCommentLikes();
        var specificLikes = this.commentLikes.filter(like => like.User_Id == this.userObject.Id && like.Comment_Id == comment.Id);
        if (specificLikes.length == 0) {

            if (this.user != null) {

                this.commentsService.update(comment).subscribe(
                    data => {

                        var like = new LikeComment();
                        like.Comment_Id = comment.Id;
                        like.User_Id = this.userObject.Id;
                        like.IsLiked = false;

                        this.themesService.setCommentLike(like).subscribe(
                            data => {
                                comment.Dislikes++;
                            },
                            error => {
                            }
                        )
                    },
                    error => {
                        this.alertService.error("Update failed.");
                    });

            }
            else {
                this.alertService.error("You are not logged in!");
            }
        }
        else {
            if (specificLikes[0].IsLiked == true) {
                specificLikes[0].IsLiked = false;
                this.themesService.updateCommentLike(specificLikes[0]).subscribe(
                    data => {
                        comment.Dislikes++;
                        comment.Likes--;
                    },
                    error => {
                    }
                )
            }
        }
    }

    dislike(theme: Theme) {
        this.getLikes();
        var specificLikes = this.likes.filter(like => like.User_Id == this.userObject.Id && like.Theme_Id == theme.Id);
        if (specificLikes.length == 0) {

            if (this.user != null) {

                this.themesService.update(theme).subscribe(
                    data => {

                        var like = new Like();
                        like.Theme_Id = theme.Id;
                        like.User_Id = this.userObject.Id;
                        like.IsLiked = false;

                        this.themesService.setLike(like).subscribe(
                            data => {
                                theme.Dislikes++;
                            },
                            error => {
                            }
                        )
                    },
                    error => {
                        this.alertService.error("Update failed.");
                    });

            }
            else {
                this.alertService.error("You are not logged in!");
            }
        }
        else {
            if (specificLikes[0].IsLiked == true) {
                specificLikes[0].IsLiked = false;
                this.themesService.updateLike(specificLikes[0]).subscribe(
                    data => {
                        theme.Dislikes++;
                        theme.Likes--;
                    },
                    error => {
                    }
                )
            }
        }

    }
}
