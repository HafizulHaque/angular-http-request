import { HttpClient } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { map, Subject } from "rxjs";
import { Post } from "./post.model";

const DB_URL: string = 'https://fir-angular-9492f-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  error = new Subject<Error>();

  constructor(
    private http: HttpClient
  ){}

  addPost(postData: {title: string, content: string}){
    return this.http.post<{name: string}>(DB_URL, postData).subscribe(
      (response: any)=>{
        console.log('post added successfully');
      },
      (err: Error)=>{
        this.error.next(err);
      }
    )
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