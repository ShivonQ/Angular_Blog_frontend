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
var Observable_1 = require('rxjs/Observable');
var Subject_1 = require('rxjs/Subject');
var blogpost_search_service_1 = require('./blogpost-search.service');
var BlogPostSearchComponent = (function () {
    function BlogPostSearchComponent(blogpostSearchService, router) {
        this.blogpostSearchService = blogpostSearchService;
        this.router = router;
        this.searchTerms = new Subject_1.Subject();
    }
    // Push a search term into the observable stream.
    BlogPostSearchComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    BlogPostSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.blogposts = this.searchTerms
            .debounceTime(300) // wait for 300ms pause in events
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time
            ? _this.blogpostSearchService.search(term)
            : Observable_1.Observable.of([]); })
            .catch(function (error) {
            // TODO: real error handling
            console.log(error);
            return Observable_1.Observable.of([]);
        });
    };
    BlogPostSearchComponent.prototype.gotoDetail = function (blogpost) {
        var link = ['/detail', blogpost.id];
        this.router.navigate(link);
    };
    BlogPostSearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'blogpost-search',
            templateUrl: 'blogpost-search.component.html',
            styleUrls: ['blogpost-search.component.css'],
            providers: [blogpost_search_service_1.BlogPostSearchService]
        }), 
        __metadata('design:paramtypes', [blogpost_search_service_1.BlogPostSearchService, router_1.Router])
    ], BlogPostSearchComponent);
    return BlogPostSearchComponent;
}());
exports.BlogPostSearchComponent = BlogPostSearchComponent;
//# sourceMappingURL=blogpost-search.component.js.map