import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User, Subforum, Comment, Like, LikeComment } from '../_models';

import { AlertService, UserService, SubforumsService, ThemesService, CommentsService } from '../_services/index';
import { Theme } from '../_models/theme';
import { Pipe, PipeTransform } from '@angular/core';
import { ThemePipe } from '../filter/themepipe';

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
    guest: boolean;

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
        var admin = JSON.parse(sessionStorage.getItem("user"));
        if(admin != null)
        {
            this.role = Number.parseInt(admin.Role);
            this.guest = false;
        }
        else
        {
            this.role = 2;
            this.guest = true;
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
    
    deleteComment(comment: Comment)
    {
        this.commentsService.delete(comment.Id)
        .subscribe(
                data => {
                    window.location.reload();
                    //this.getComments();
                    this.alertService.success('Comment deleted', false);                    
                },
                error => {
                    this.alertService.error('Error while deleting comment');
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

    like(theme: Theme)
    {
       // this.getLikes();       
        var specificLikes =  this.likes.filter(like => like.User_Id == this.userObject.Id && like.Theme_Id == theme.Id);
   
        if (specificLikes.length == 0) 
        {

            if (this.user != null) 
            {

                theme.Likes++;

                this.themesService.update(theme).subscribe(
                data => {
                    
                   var like = new Like();
                   like.Theme_Id = theme.Id;
                   like.User_Id = this.userObject.Id;
                   like.IsLiked = true;
  
                   this.themesService.setLike(like).subscribe(
                       data => {
                            this.likes.push(like);
                       },
                       error => {                    
                       }
                   )                  
                },
                error => {
                    this.alertService.error("Update failed.");
                });
            
            }
            else
            {
                this.alertService.error("You are not logged in!");
            }
        }
        else
        {
            debugger
            if (specificLikes[0].IsLiked == false) {
            specificLikes[0].IsLiked = true;

            theme.Likes++;
            theme.Dislikes--;

            specificLikes[0].User = null;
            specificLikes[0].Theme = null;
            
            this.themesService.update(theme).subscribe(
                    data => {
    
                    this.themesService.updateLike(specificLikes[0]).subscribe(
                        data => {
                                this.likes.forEach(like => {
                                    if (like.Id == specificLikes[0].Id)
                                    {
                                        this.likes[like.Id].IsLiked = true;
                                    }
                                });
                        },
                        error => {                    
                        }
                    )                  
                    },
                    error => {
                        this.alertService.error("Update failed.");
                    });
            }          
        }
    }

    likeComment(comment: Comment)
    {
      //  this.getCommentLikes();
        var specificLikes =  this.commentLikes.filter(like => like.User_Id == this.userObject.Id && like.Comment_Id == comment.Id);
        if (specificLikes.length == 0) 
        {

            if (this.user != null) 
            {

                comment.Likes++;
                this.commentsService.update(comment).subscribe(
                data => {
                    
                   var like = new LikeComment();
                   like.Comment_Id = comment.Id;
                   like.User_Id = this.userObject.Id;
                   like.IsLiked = true;
  
                   this.themesService.setCommentLike(like).subscribe(
                       data => {                        
                          this.commentLikes.push(like);
                       },
                       error => {                    
                       })},
                    error => {
                        this.alertService.error("Update failed.");
                });            
            }
            else
            {
                this.alertService.error("You are not logged in!");
            }
        }
        else
        {
            debugger
            if (specificLikes[0].IsLiked == false) 
            {
                specificLikes[0].IsLiked = true;
                comment.Dislikes--;
                comment.Likes++;
                specificLikes[0].User = null;
                specificLikes[0].Comment = null;

                this.commentsService.update(comment).subscribe(
                        data => {
        
                        this.themesService.updateCommentLike(specificLikes[0]).subscribe(
                            data => {
                                    this.commentLikes.forEach(like => {
                                        if (like.Id == specificLikes[0].Id)
                                        {
                                            this.commentLikes[like.Id].IsLiked = true;
                                        }
                                    });
                            },
                            error => {                    
                            })},
                            error => {
                                this.alertService.error("Update failed.");
                        });
            }          
        }
    }

    dislikeComment(comment: Comment)
    {
        debugger
       // this.getCommentLikes();
        var specificLikes =  this.commentLikes.filter(like => like.User_Id == this.userObject.Id && like.Comment_Id == comment.Id);
        if (specificLikes.length == 0) 
        {

            if (this.user != null) 
            {

                comment.Dislikes++;
                this.commentsService.update(comment).subscribe(
                data => {
                    
                   var like = new LikeComment();
                   like.Comment_Id = comment.Id;
                   like.User_Id = this.userObject.Id;
                   like.IsLiked = false;
  
                   this.themesService.setCommentLike(like).subscribe(
                       data => {
                          this.commentLikes.push(like);
                       },
                       error => {                    
                       })},
                    error => {
                        this.alertService.error("Update failed.");
                });
            
            }
            else
            {
                this.alertService.error("You are not logged in!");
            }
        }
        else
        {
            if (specificLikes[0].IsLiked == true) 
            {
                specificLikes[0].IsLiked = false;
                comment.Dislikes++;
                comment.Likes--;
                specificLikes[0].User = null;
                specificLikes[0].Comment = null;

                this.commentsService.update(comment).subscribe(
                        data => {
        
                        this.themesService.updateCommentLike(specificLikes[0]).subscribe(
                            data => {
                                    this.commentLikes.forEach(like => {
                                        if (like.Id == specificLikes[0].Id)
                                        {
                                            this.commentLikes[like.Id].IsLiked = false;
                                        }
                                    });
                            },
                            error => {                    
                            }
                        )                  
                        },
                        error => {
                            this.alertService.error("Update failed.");
                        });

            }          
        }
    }

    dislike(theme: Theme)
    {
       // this.getLikes();
        var specificLikes =  this.likes.filter(like => like.User_Id == this.userObject.Id && like.Theme_Id == theme.Id);
        if (specificLikes.length == 0) 
        {

            if (this.user != null) 
            {
                theme.Dislikes++;
                this.themesService.update(theme).subscribe(
                data => {
                    
                   var like = new Like();
                   like.Theme_Id = theme.Id;
                   like.User_Id = this.userObject.Id;
                   like.IsLiked = false;
  
                   this.themesService.setLike(like).subscribe(
                       data => {
                            this.likes.push(like);
                       },
                       error => {                    
                       }
                   )                  
                },
                error => {
                    this.alertService.error("Update failed.");
                });
            
            }
            else
            {
                this.alertService.error("You are not logged in!");
            }
        }
        else
        {
            debugger
            if (specificLikes[0].IsLiked == true) 
            {
                specificLikes[0].IsLiked = false;

                theme.Dislikes++;
                theme.Likes--;
                specificLikes[0].User = null;
                specificLikes[0].Theme = null;

                this.themesService.update(theme).subscribe(
                        data => {
        
                        this.themesService.updateLike(specificLikes[0]).subscribe(
                            data => {
                                    this.likes.forEach(like => {
                                        if (like.Id == specificLikes[0].Id)
                                        {
                                            this.likes[like.Id].IsLiked = false;
                                        }
                                    });
                            },
                            error => {                    
                            }
                        )                  
                        },
                        error => {
                            this.alertService.error("Update failed.");
                        });
            }          
        }    
    }
}
