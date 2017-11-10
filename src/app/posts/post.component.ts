import {Component, OnInit} from "@angular/core";
import {Post} from './post';
import {PostService} from './posts.service';

@Component({
    selector: 'post',
    templateUrl: './post.component.html',
    providers: [PostService],
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    errorMessage: string;
    posts: Post[];

    // We don't call the get method in the constructor
    constructor(private postService: PostService) {}

    // Fetching the records in the onInit lifecycle method makes the application easier to debug
    ngOnInit() { this.getPosts(); }

    getPosts() {
        this.postService.getPosts()
            .subscribe(
                posts => this.posts = posts,
                error => this.errorMessage = <any>error
            )
    }

    createPost(post: Post) {
        if (!post.title) return;
        this.postService.addPost(post)
            .subscribe(
                newPost => this.posts = [newPost, ...this.posts],
                error => this.errorMessage = <any>error
            )
    }
}
