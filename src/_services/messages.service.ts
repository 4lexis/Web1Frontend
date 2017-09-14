import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Message } from '../_models/message';
import 'rxjs/add/operator/toPromise';

const baseUrl = "http://localhost:1172";

@Injectable()
export class MessagesService {
    constructor(private http: Http) { 
    }

    getAll() : Promise<Message[]> {
        return this.http.get(baseUrl + '/api/messages?$expand=Sender,Receiver').toPromise().then(response => { return response.json() as Message[]; }).catch(this.handleError);
    }

    sendMessage(message: Message) {
        return this.http.post(baseUrl + '/api/messages', message).map((response: Response) => response.json());
    }

    update(message: Message){
        return this.http.put(baseUrl + '/api/messages/' + message.Id, message).map((response:Response) => response.json());
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}