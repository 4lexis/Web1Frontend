
import { User, Subforum } from '../_models/index';

export class FollowsSubforum {
    Id: number;
    Subforum: Subforum;
    User: User;
    User_Id: number;
    Subforum_Id: number;
}