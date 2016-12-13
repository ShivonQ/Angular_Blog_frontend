import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { BlogPost }           from '../blogpost';
@Injectable()
export class BlogPostSearchService {
  constructor(private http: Http) {}
  search(term: string): Observable<BlogPost[]> {
    return this.http
      .get(`app/blogposts/?title=${term}`)
      .map((r: Response) => r.json().data as BlogPost[]);
  }
}
