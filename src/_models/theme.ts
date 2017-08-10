
import { Subforum, User } from '../_models/index';

export class Theme {
    Id: number;
    Title: string;
    SubForum: Subforum;
    Author: User;
    Text: string;
    Image: string;
    Link: string;
    CreationDate: Date;
    Likes: number;
    Dislikes: number;
}