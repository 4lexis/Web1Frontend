import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from '../_directives/index';
import { AuthGuard } from '../_guards/index';
import { AlertService, AuthenticationService, UserService, SubforumsService } from '../_services/index';
import { HomeComponent } from '../home/index';
import { LoginComponent } from '../login/index';
import { RegisterComponent } from '../register/index';
import { EditProfileComponent } from '../editprofile/index';
import { SubForumComponent} from '../subforum/index';
import { UserRolesComponent } from '../userroles/userroles.component';
import { InlineEditorModule } from 'ng2-inline-editor';
import { ThemesComponent } from '../themes/themes.component';
import { ThemesService } from '../_services/themes.service';
import { CommentsService } from '../_services/comments.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InlineEditorModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        EditProfileComponent,
        SubForumComponent,
        UserRolesComponent,
        ThemesComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        SubforumsService,
        AuthenticationService,
        UserService,
        ThemesService,
        CommentsService,

        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }