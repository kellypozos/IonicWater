import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost/api_ionic/api/users';
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<[User]>(this.url);
  }

  get(id: string) {
    return this.http.get<[User]>(this.url + '/' + id);
  }

  create(user: User) {
    return this.http.post(this.url, user);
  }

  update(user: User, id: string) {
    return this.http.put(this.url + '/' + id, user);
  }

  remove(id: string) {
    return this.http.delete(this.url + '/' + id);
  }

}
