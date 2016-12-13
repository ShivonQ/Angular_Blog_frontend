import './rxjs-extensions';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { BlogPostsComponent}      from './blogposts/blogposts.component';
import { BlogPostDetailComponent }  from './blogpost-detail/blogpost-detail.component';
import {BlogPostService}          from './blogpost.service';
import { BlogPostSearchComponent }  from './blogpost-search/blogpost-search.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    BlogPostDetailComponent,
    BlogPostsComponent,
    BlogPostSearchComponent
  ],
  providers: [ BlogPostService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
