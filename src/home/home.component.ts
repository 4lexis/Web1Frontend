import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User, Subforum } from '../_models';

import { AlertService, UserService, SubforumsService } from '../_services/index';
import { Theme } from '../_models/theme';
import { Like } from '../_models/like';
import { LikeComment } from '../_models/likecomment';
import { FollowsSubforum } from '../_models/followssubforum';
import { ThemesService } from '../_services/themes.service';
import { Pipe, PipeTransform } from '@angular/core';
import { ForumPipe } from '../filter/forumpipe';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    subforums: Subforum[];
    user: String;
    loading = false;
    option: String;
    loggedUser: User;
    themes: Theme[];
    likedThemes: Like[];
    dislikedThemes: Like[];
    likedComments: LikeComment[];
    dislikedComments: LikeComment[];
    followings: FollowsSubforum[];
    name: String;

    constructor(
        private router: Router,
        private alertService: AlertService,
        private subforumService: SubforumsService,
        private themesService: ThemesService) { }

    ngOnInit() {        
        this.loadAllSubforums();
        this.user = sessionStorage.getItem("user");        
        if (this.user != null)
        {
            this.option = "Logout";
            this.loggedUser = JSON.parse(sessionStorage.getItem("user"));
            this.name = this.loggedUser.Name;
            this.getLikes();
            this.getFollowingSubforums();            
        }
        else
        {
            
            this.option = "Login";
            this.name = "Guest";
        }
    }

    deleteSubforum(forum: Subforum)
    {
        var currentUser = JSON.parse(sessionStorage.getItem("user"));
        if(currentUser.Role != 0)
        {
            this.alertService.error("No privilage to delete subforum", true);
                                    
        }
        else
        {
            this.subforumService.delete(forum.Id).subscribe(
                    data => {
                        this.alertService.success("Subforum deleted", true);
                        this.router.navigate(['/home']);
                    },
                    error => {
                        this.alertService.error("Error while trying to delete subforum.", true);
                        this.router.navigate(['/home']);
                    });
        }
        this.router.navigate(['/home']);
    }

    showMessages()
    {
        if (this.user != null)
         {
            this.router.navigate(['/messages']);
         }
         else
         {
             this.alertService.error("You are not logged in!");
         }

    }

    private openSubforum(sub:Subforum)
    {
        sessionStorage.setItem("subforum", sub.Name);
        sessionStorage.setItem("subforumId", sub.Id.toString());
        this.router.navigate(['/themes']);
    }

    getFollowingSubforums()
    {
        this.subforumService.getFollowers().then(
            follows => {
                     this.followings = follows.filter(f => f.User_Id == this.loggedUser.Id);                     
                });
    }

    getLikes()
    {
      this.themesService.getLikes().then(
            likes => {

                     this.likedThemes = likes.filter(theme => theme.User_Id == this.loggedUser.Id && theme.IsLiked == true)
                     this.dislikedThemes = likes.filter(theme => theme.User_Id == this.loggedUser.Id && theme.IsLiked == false)                  
                });
                     
      this.themesService.getCommentLikes().then(
            comments => {
                     this.likedComments = comments.filter(comment => comment.User_Id == this.loggedUser.Id && comment.IsLiked == true)
                     this.dislikedComments = comments.filter(comment => comment.User_Id == this.loggedUser.Id && comment.IsLiked == false)                     
                });

    }

    editProfile()
    {
        
        if (this.user != null)
         {
            this.router.navigate(['/profile']);
         }
         else
         {
             this.alertService.error("You are not logged in!");
         }

    }
    logout()
    {
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }

    postSubforum()
    {
        if(sessionStorage.length == 0)
        {
            this.alertService.error("You can not post things, please log in");            
        }
        else
        {
            var admin = JSON.parse(sessionStorage.getItem("user"));
            if(admin.Role != 2)
            {
                this.router.navigate(['/subforum']);
            }
            else
            {
                this.alertService.error("You can not create forums as regular user");
            }
        }
    }

    editUsers()
    {
        // if(sessionStorage.length == 0)
        // {
        //     this.alertService.error("No premission to enter while unlogged");
        // }
        // else
        // {
        //     var admin = JSON.parse(sessionStorage.getItem("user"));
        //     if(admin.Role == 0)
        //     {
                 this.router.navigate(['/userroles']);
        //     }
        //     else
        //     {
        //         this.alertService.error("No premission to enter");
        //     }
        // }
    }

    followSubforum(subforum: Subforum)
    {
        debugger
        if (this.user != null )
        {   
            var follow = new FollowsSubforum();
            follow.Subforum_Id = subforum.Id;
            follow.User_Id = this.loggedUser.Id;

            this.subforumService.followSubforum(follow).subscribe(
                 data => {
                     this.alertService.success("Success following subforum", true);
                     this.router.navigate(['/home']);                     
                },
                error => {
                    this.alertService.error("You are already following this subforum.", true);
                    this.router.navigate(['/home']);
                });
        }

        else
        {
             this.alertService.error("You are not logged in!");
        }
    }

    unfollowSubforum(subforum: Subforum)
    {        
        if (this.user != null )
        {   
            debugger
            var unfollow = new FollowsSubforum();
            unfollow.Subforum_Id = subforum.Id;
            unfollow.User_Id = this.loggedUser.Id;
            this.subforumService.unfollowSubforum(unfollow).subscribe(
                 data => {
                     this.alertService.success("Success unfollowing subforum", true);
                     this.router.navigate(['/home']);
                },
                error => {
                    this.alertService.error("You are not following this subforum.", true);
                    this.router.navigate(['/home']);
                });
        }

        else
        {
             this.alertService.error("You are not logged in!");
        }
    }

    private loadAllSubforums(){

         this.subforumService.getAll().then( 
            subforums => {
                this.subforums = subforums;}
        );

    }

}
