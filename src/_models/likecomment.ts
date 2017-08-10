
import { User, Comment } from '../_models/index';

export class LikeComment {
    Id: number;
    Comment: Comment;
    User: User;
    User_Id: number;
    Comment_Id: number;
    IsLiked: boolean;
}