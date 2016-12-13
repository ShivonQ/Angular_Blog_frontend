import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { BlogPostSearchService } from './blogpost-search.service';
import { BlogPost } from '../blogpost';
@Component({
  moduleId: module.id,
  selector: 'blogpost-search',
  templateUrl: 'blogpost-search.component.html',
  styleUrls: [ 'blogpost-search.component.css' ],
  providers: [BlogPostSearchService]
})
export class BlogPostSearchComponent implements OnInit {
  blogposts: Observable<BlogPost[]>;
  private searchTerms = new Subject<string>();
  constructor(
    private blogpostSearchService: BlogPostSearchService,
    private router: Router) {}
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.blogposts = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.blogpostSearchService.search(term)
        // or the observable of empty blogposts if no search term
        : Observable.of<BlogPost[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<BlogPost[]>([]);
      });
  }
  gotoDetail(blogpost: BlogPost): void {
    let link = ['/detail', blogpost.id];
    this.router.navigate(link);
  }
}
