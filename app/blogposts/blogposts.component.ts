import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { BlogPost }                from '../blogpost';
import { BlogPostService }         from '../blogpost.service';
@Component({
  moduleId: module.id,
  selector: 'my-blogposts',
  templateUrl: 'blogposts.component.html',
  styleUrls: [ 'blogposts.component.css' ]
})
export class BlogPostsComponent implements OnInit {
  blogposts: BlogPost[];
  selectedBlogPost: BlogPost;
  constructor(
    private blogPostService: BlogPostService,
    private router: Router) { }
  getBlogPosts(): void {
    this.blogPostService
      .getBlogPosts()
      .then(blogposts => this.blogposts = blogposts);
  }
  add(title: string, text: string): void {
    title = title.trim();
    if (!title || !text) { return; }
    this.blogPostService.create(title,text)
      .then(blogpost => {
        this.blogposts.push(blogpost);
        this.selectedBlogPost = null;
      });
  }
  delete(blogpost: BlogPost): void {
    this.blogPostService
      .delete(blogpost.id)
      .then(() => {
        this.blogposts = this.blogposts.filter(h => h !== blogpost);
        if (this.selectedBlogPost === blogpost) { this.selectedBlogPost = null; }
      });
  }
  ngOnInit(): void {
    this.getBlogPosts();
  }
  onSelect(blogpost: BlogPost): void {
    this.selectedBlogPost = blogpost;
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedBlogPost.id]);
  }
}
