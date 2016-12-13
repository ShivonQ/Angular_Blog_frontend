import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { BlogPost }        from '../blogpost';
import { BlogPostService } from '../blogpost.service';
@Component({
  moduleId: module.id,
  selector: 'my-blogpost-detail',
  templateUrl: 'blogpost-detail.component.html',
  styleUrls: [ 'blogpost-detail.component.css' ]
})
export class BlogPostDetailComponent implements OnInit {
  blogpost: BlogPost;
  constructor(
    private blogpostService: BlogPostService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.blogpostService.getBlogPost(+params['id']))
      .subscribe(blogpost => this.blogpost = blogpost);
  }
  save(): void {
    this.blogpostService.update(this.blogpost)
      .then(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
}
