import { HttpClient } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { map } from "rxjs";
import { Post } from "./post.model";

const DB_URL: string = 'https://angular-test-e99d3-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ){}

  addPost(postData: {title: string, content: string}){
    this.http
      .post<{name: string}>(DB_URL, postData)
      .subscribe(response => {
        response ? console.log('post added successfully') : console.log('post addition failed');
      });
  }

  getPosts(){
    return this.http
      .get<{[key: string]: Post}>(DB_URL)
      .pipe(
        map( responseData => {
          console.log(responseData);
          const resultData: Post[] = [];
          for(const key in responseData){
            if(responseData.hasOwnProperty(key)){
              resultData.push({ ...responseData[key], id: key });
            }
          }
          return resultData;
        })
      )
  }

  deletePosts(){
    return this.http.delete(DB_URL);
  }
}