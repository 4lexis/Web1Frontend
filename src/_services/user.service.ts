import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';
import 'rxjs/add/operator/toPromise';

const baseUrl = "http://localhost:1172";

@Injectable()
export class UserService {
    constructor(private http: Http) { 
    }
    
    getAll() : Promise<User[]> {
        return this.http.get(baseUrl + '/api/users').toPromise().then(response => { return response.json() as User[]; }).catch(this.handleError);
    }

    login(username: string, password: string) : Promise<User> {
        return this.http.get(baseUrl + '/api/users?username='+username+'&password='+password).toPromise().then(response => { return response.json() as User; }).catch(this.handleError);
    }

    create(user: User) {
        return this.http.post(baseUrl + '/api/users', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put(baseUrl + '/api/users/' + user.Id, user).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}