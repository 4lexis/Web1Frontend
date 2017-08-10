
import { User, Theme } from '../_models/index';

export class Comment {
    Id: number;
    Theme: Theme;
    Author: User;
    TimeStamp: Date;
    ParentComment: Comment;
    Content: string;
    Likes: number;
    Dislikes: number;
    Edited: boolean;
}