import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Comment } from '../_models/index';
import 'rxjs/add/operator/toPromise';

const baseUrl = "http://localhost:1172";

@Injectable()
export class CommentsService {
    constructor(private http: Http) { 
    }

    getAll() : Promise<Comment[]> {
        return this.http.get(baseUrl + '/api/comments?$expand=Theme,Author,ParentComment').toPromise().then(response => { return response.json() as Comment[]; }).catch(this.handleError);
    }

    update(comment: Comment) {
        return this.http.put(baseUrl + '/api/comments/' + comment.Id, comment).map((response: Response) => response.json());
    }

    create(comment: Comment) {
        return this.http.post(baseUrl + '/api/comments', comment).map((response: Response) => response.json());
    }    

    delete(id: number) {
        return this.http.delete(baseUrl + '/api/comments/' + id).map((response: Response) => response.json());
    }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}