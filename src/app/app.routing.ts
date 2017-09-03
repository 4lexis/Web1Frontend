import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home/index';
import { LoginComponent } from '../login/index';
import { RegisterComponent } from '../register/index';
import { EditProfileComponent } from '../editprofile/index';

import { SubForumComponent} from '../subforum/index';
import { UserRolesComponent } from '../userroles/userroles.component';
import { ThemesComponent } from '../themes/themes.component';
import { MakeCommentComponent } from '../makecomment/makecomment.component';
import { PostThemeComponent } from '../posttheme/posttheme.component';
import { MessagesComponent } from '../messages/messages.component';





const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'subforum', component: SubForumComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'userroles', component: UserRolesComponent},
    { path: 'profile', component: EditProfileComponent },
    { path: 'themes', component: ThemesComponent },
    { path: 'posttheme', component: PostThemeComponent},    
    { path: 'makecomment', component: MakeCommentComponent},
    { path: 'messages', component: MessagesComponent }

];

export const routing = RouterModule.forRoot(appRoutes);