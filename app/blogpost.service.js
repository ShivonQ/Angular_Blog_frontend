"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var BlogPostService = (function () {
    function BlogPostService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.blogpostsUrl = 'app/blogposts'; // URL to web api
    }
    BlogPostService.prototype.getBlogPosts = function () {
        return this.http.get(this.blogpostsUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    BlogPostService.prototype.getBlogPost = function (id) {
        return this.getBlogPosts()
            .then(function (blogposts) { return blogposts.find(function (blogpost) { return blogpost.id === id; }); });
    };
    BlogPostService.prototype.delete = function (id) {
        var url = this.blogpostsUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    BlogPostService.prototype.create = function (title, text) {
        return this.http
            .post(this.blogpostsUrl, JSON.stringify({ title: title, text: text }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    BlogPostService.prototype.update = function (blogpost) {
        var url = this.blogpostsUrl + "/" + blogpost.id;
        return this.http
            .put(url, JSON.stringify(blogpost), { headers: this.headers })
            .toPromise()
            .then(function () { return blogpost; })
            .catch(this.handleError);
    };
    BlogPostService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    BlogPostService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], BlogPostService);
    return BlogPostService;
}());
exports.BlogPostService = BlogPostService;
//# sourceMappingURL=blogpost.service.js.map