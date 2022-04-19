import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  postForm !: FormGroup;
  loadedPosts: Post[] = [];
  fetching: boolean =  false;

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
  }

  onSubmit(){
    this.postService.addPost(this.postForm.value)
    this.postForm.reset();
  }

  onFetch(){
    this.fetching = true;
    this.postService
      .getPosts()
      .subscribe((posts: Post[])=>{
        this.loadedPosts = posts;
      })
    this.fetching = false;
  }

  onClear(){
    this.postService
    .deletePosts()
    .subscribe(()=>{
      this.loadedPosts = [];
    })
  }

}
