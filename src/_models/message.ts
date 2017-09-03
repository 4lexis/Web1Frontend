import { User } from '../_models/index';

export class Message {
    Id: number;
    Sender_Id: number;
    Sender: User;
    Receiver_Id: number;
    Receiver: User;
    Text: string;
    Readed: boolean;
}