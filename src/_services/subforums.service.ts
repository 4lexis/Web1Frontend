import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Subforum } from '../_models/subforum';
import { FollowsSubforum } from '../_models/followssubforum';


const headers = new Headers({'Content-Type': 'application/json'});
const baseUrl = "http://localhost:1172";

@Injectable()
export class SubforumsService {
    constructor(private http: Http) { 
    }

    getAll() : Promise<Subforum[]> {
        return this.http.get(baseUrl + '/api/subforums?$expand=ResponsibleModerator').toPromise().then(response => { return response.json() as Subforum[]; }).catch(this.handleError);
    }

    getForum(): Promise<Subforum>{
        return this.http.get(baseUrl + '/api/subforums').toPromise().then(response => { return response.json() as Subforum; }).catch(this.handleError);
    }

    create(forum: Subforum) {
        return this.http.post(baseUrl + '/api/subforums', forum).map((response: Response) => response.json());
    }

    update(forum: Subforum) {
        return this.http.put(baseUrl + '/api/subforums/' + forum.Id, forum).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/subforums/' + id).map((response: Response) => response.json());
    }

    getFollowers(): Promise<FollowsSubforum[]> {
       return this.http.get(baseUrl + '/api/followsubforums?$expand=User,SubForum').toPromise().then(response => { return response.json() as FollowsSubforum[]; }).catch(this.handleError);
    }

    followSubforum(subforum: FollowsSubforum) 
    {
       return this.http.post(baseUrl + '/api/followsubforums/' + subforum.Id, subforum).map((response: Response) => response.json());
    }



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}