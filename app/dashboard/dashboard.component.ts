import { Component, OnInit } from '@angular/core';

import { BlogPost } from '../blogpost';
import { BlogPostService } from '../blogpost.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  blogposts: BlogPost[] = [];

  constructor(private blogpostService: BlogPostService) { }

  ngOnInit(): void {
    this.blogpostService.getBlogPosts()
      .then(blogposts => this.blogposts = blogposts.slice(1, 5));
  }
}
