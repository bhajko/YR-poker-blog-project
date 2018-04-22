import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class BlogService {

options;
domain = this.authService.domain;
    

constructor(
    private authService: AuthService,
    private http: Http
) { }

createAuthHeaders() {
    this.authService.loadToken();
    this.options = new RequestOptions({
        headers: new Headers({
            'Content-Type': 'application/json',
            'authorization': this.authService.authToken
        })
    });
}

newBlog(blog) {
    this.createAuthHeaders();
    return this.http.post(this.domain + '/blogs/newBlog', blog, this.options).map(res => res.json());
}

getAllBlogs() {
    this.createAuthHeaders();
    return this.http.get(this.domain + '/blogs/allBlogs', this.options).map(res => res.json());
}

getBlogPost(id) {
    this.createAuthHeaders();
    return this.http.get(this.domain + '/blogs/blogPost/' + id, this.options).map(res => res.json());
}

editBlog(blog) {
    this.createAuthHeaders();
    return this.http.put(this.domain + '/blogs/updateBlog/', blog, this.options).map(res => res.json());
}

deleteBlog(id) {
    this.createAuthHeaders();
    return this.http.delete(this.domain + '/blogs/deleteBlog/' + id, this.options).map(res => res.json());
}

postComment(id, comment) {
    this.createAuthHeaders();
    const blogData = {
        id: id,
        comment: comment
    }
    return this.http.post(this.domain + '/blogs/comment', blogData, this.options).map(res => res.json());
}

}
