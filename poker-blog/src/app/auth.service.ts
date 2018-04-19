import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

domain = "http://localhost:3500";
authToken;
user;
options;

constructor(
    private http: Http
) { }

createAuthHeaders() {
    this.loadToken();
    this.options = new RequestOptions({
        headers: new Headers({
            'Content-Type': 'application/json',
            'authorization': this.authToken
        })
    });
}

loadToken() {
    this.authToken = localStorage.getItem('token');
}

registerUser(user) {
    return this.http.post(this.domain + '/auth/register', user).map(res => res.json());
}

login(user) {
    return this.http.post(this.domain + '/auth/login', user).map(res => res.json());
}

logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
}

storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
}

getProfil() {
    this.createAuthHeaders();
    return this.http.get(this.domain + '/auth/profil', this.options).map(res => res.json());
}

loggedIn() {
    return tokenNotExpired();
}

}
