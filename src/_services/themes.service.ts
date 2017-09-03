import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Theme, Like, LikeComment } from '../_models/index';
import 'rxjs/add/operator/toPromise';

const baseUrl = "http://localhost:1172";

@Injectable()
export class ThemesService {
    constructor(private http: Http) { 
    }

    getAll() : Promise<Theme[]> {
        return this.http.get(baseUrl + '/api/themes?$expand=SubForum,Author').toPromise().then(response => { return response.json() as Theme[]; }).catch(this.handleError);
    }

    update(theme: Theme) {
        return this.http.put(baseUrl + '/api/themes/' + theme.Id, theme).map((response: Response) => response.json());
    }

    delete(theme: Theme){
        return this.http.delete(baseUrl+ '/api/themes/'+ theme.Id).map((response: Response)=> response.json());
    }

    updateLike(like:Like) {
        return this.http.put(baseUrl + '/api/likethemes/' + like.Id, like).map((response: Response) => response.json());
    }

    create(theme: Theme) {        
        return this.http.post(baseUrl + '/api/themes/', theme).map((response: Response) => response.json());
    }

    getLikes(): Promise<Like[]> {
        return this.http.get(baseUrl + '/api/likethemes?$expand=User,Theme/SubForum, Theme/Author').toPromise().then(response => { return response.json() as Like[]; }).catch(this.handleError);
    }

    setLike(like:Like) {
        return this.http.post(baseUrl + '/api/likethemes/' + like.Id, like).map((response: Response) => response.json());
    }

    updateCommentLike(like:LikeComment) {
        return this.http.put(baseUrl + '/api/likecomments/' + like.Id, like).map((response: Response) => response.json());
    }

    getCommentLikes(): Promise<LikeComment[]> {
        return this.http.get(baseUrl + '/api/likecomments?$expand=User,Comment/Author, Comment/Theme/Author').toPromise().then(response => { return response.json() as LikeComment[]; }).catch(this.handleError);
    }

    setCommentLike(like:LikeComment) {
        return this.http.post(baseUrl + '/api/likecomments/' + like.Id, like).map((response: Response) => response.json());
    }

    uploadPic(pic: any) {
        return this.http.post('http://localhost:1172/api/themes/upload', pic).map((response: Response) => response.json());
    }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}