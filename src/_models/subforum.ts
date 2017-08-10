
import { User } from '../_models/index';

export class Subforum {
    Id: number;
    Name: string;
    Description: string;
    Rules: string;
    Image: string;
    ResponsibleModerator_Id: number;
    ResponsibleModerator: User;
}