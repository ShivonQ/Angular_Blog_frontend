import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BlogPost } from './blogpost';
@Injectable()
export class BlogPostService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private blogpostsUrl = 'app/blogposts';  // URL to web api
  constructor(private http: Http) { }
  getBlogPosts(): Promise<BlogPost[]> {
    return this.http.get(this.blogpostsUrl)
      .toPromise()
      .then(response => response.json().data as BlogPost[])
      .catch(this.handleError);
  }
  getBlogPost(id: number): Promise<BlogPost> {
    return this.getBlogPosts()
      .then(blogposts => blogposts.find(blogpost => blogpost.id === id));
  }
  delete(id: number): Promise<void> {
    const url = `${this.blogpostsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  create(title: string,text:string): Promise<BlogPost> {
    return this.http
      .post(this.blogpostsUrl, JSON.stringify({title: title,text:text}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  update(blogpost: BlogPost): Promise<BlogPost> {
    const url = `${this.blogpostsUrl}/${blogpost.id}`;
    return this.http
      .put(url, JSON.stringify(blogpost), {headers: this.headers})
      .toPromise()
      .then(() => blogpost)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
