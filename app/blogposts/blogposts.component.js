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
var router_1 = require('@angular/router');
var blogpost_service_1 = require('../blogpost.service');
var BlogPostsComponent = (function () {
    function BlogPostsComponent(blogPostService, router) {
        this.blogPostService = blogPostService;
        this.router = router;
    }
    BlogPostsComponent.prototype.getBlogPosts = function () {
        var _this = this;
        this.blogPostService
            .getBlogPosts()
            .then(function (blogposts) { return _this.blogposts = blogposts; });
    };
    BlogPostsComponent.prototype.add = function (title, text) {
        var _this = this;
        title = title.trim();
        if (!title || !text) {
            return;
        }
        this.blogPostService.create(title, text)
            .then(function (blogpost) {
            _this.blogposts.push(blogpost);
            _this.selectedBlogPost = null;
        });
    };
    BlogPostsComponent.prototype.delete = function (blogpost) {
        var _this = this;
        this.blogPostService
            .delete(blogpost.id)
            .then(function () {
            _this.blogposts = _this.blogposts.filter(function (h) { return h !== blogpost; });
            if (_this.selectedBlogPost === blogpost) {
                _this.selectedBlogPost = null;
            }
        });
    };
    BlogPostsComponent.prototype.ngOnInit = function () {
        this.getBlogPosts();
    };
    BlogPostsComponent.prototype.onSelect = function (blogpost) {
        this.selectedBlogPost = blogpost;
    };
    BlogPostsComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedBlogPost.id]);
    };
    BlogPostsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-blogposts',
            templateUrl: 'blogposts.component.html',
            styleUrls: ['blogposts.component.css']
        }), 
        __metadata('design:paramtypes', [blogpost_service_1.BlogPostService, router_1.Router])
    ], BlogPostsComponent);
    return BlogPostsComponent;
}());
exports.BlogPostsComponent = BlogPostsComponent;
//# sourceMappingURL=blogposts.component.js.map