
import { User, Theme } from '../_models/index';

export class Comment {
    Id: number;
    Theme: Theme;
    Theme_Id: number;
    Author: User;
    Author_Id: number;
    TimeStamp: Date;
    ParentComment: Comment;
    Content: string;
    Likes: number;
    Dislikes: number;
    Edited: boolean;
}