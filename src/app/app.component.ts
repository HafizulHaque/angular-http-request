import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  
  postForm !: FormGroup;
  loadedPosts: Post[] = [];
  fetching: boolean =  false;
  error: any = null;

  subscription !: Subscription;

  constructor(
    private fb: FormBuilder,
    private postService: PostService
  ){}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required]]
    })
    this.onFetch();

    this.subscription = this.postService.error.subscribe((err: any)=>{
      this.error = err;
    })
  }

  onSubmit(){
    this.postService.addPost(this.postForm.value);
    this.postForm.reset();
  }

  onFetch(){
    this.fetching = true;
    this.postService
      .getPosts()
      .subscribe((posts: Post[])=>{
        this.loadedPosts = posts;
        this.fetching = false;
      }, (err: Error)=>{
        this.error = err;
      })
    
  }

  onClear(){
    this.postService
    .deletePosts()
    .subscribe(
      ()=>{
        this.error = null;
        this.loadedPosts = [];
      },
      (err: Error)=>{
        console.log(err)
        this.error = err;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
