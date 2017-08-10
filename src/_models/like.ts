
import { User, Theme } from '../_models/index';

export class Like {
    Id: number;
    Theme: Theme;
    User: User;
    User_Id: number;
    Theme_Id: number;
    IsLiked: boolean;
}