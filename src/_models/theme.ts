
import { Subforum, User } from '../_models/index';

export class Theme {
    Id: number;
    Title: string;
    SubForum: Subforum;
    SubForum_Id: number;
    Author: User;
    Author_Id: number;
    Text: string;
    Image: string;
    Link: string;
    CreationDate: Date;
    Likes: number;
    Dislikes: number;
}