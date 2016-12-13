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
require('rxjs/add/operator/switchMap');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var blogpost_service_1 = require('../blogpost.service');
var BlogPostDetailComponent = (function () {
    function BlogPostDetailComponent(blogpostService, route, location) {
        this.blogpostService = blogpostService;
        this.route = route;
        this.location = location;
    }
    BlogPostDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.blogpostService.getBlogPost(+params['id']); })
            .subscribe(function (blogpost) { return _this.blogpost = blogpost; });
    };
    BlogPostDetailComponent.prototype.save = function () {
        var _this = this;
        this.blogpostService.update(this.blogpost)
            .then(function () { return _this.goBack(); });
    };
    BlogPostDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    BlogPostDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-blogpost-detail',
            templateUrl: 'blogpost-detail.component.html',
            styleUrls: ['blogpost-detail.component.css']
        }), 
        __metadata('design:paramtypes', [blogpost_service_1.BlogPostService, router_1.ActivatedRoute, common_1.Location])
    ], BlogPostDetailComponent);
    return BlogPostDetailComponent;
}());
exports.BlogPostDetailComponent = BlogPostDetailComponent;
//# sourceMappingURL=blogpost-detail.component.js.map