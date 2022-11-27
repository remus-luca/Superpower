import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable()
export class HeroService {
  [x: string]: any;
  private readonly baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000';
  }
  getHeroes(): Observable<Hero[]> {
    const url = `${this.baseUrl}/heroes`;
    return this.http.get<Hero[]>(url);
  }
  postHero(data: any) {
    return this.http.post<any>('http://localhost:3000/heroes/', data);
  }
  getHero(id: number): Observable<Hero> {
    const url = `${this.baseUrl}/heroes/${id}`;
    return this.http.get<Hero>(url);
  }
  putHero(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/heroes/' + id, data);
  }

  updatedHeroSuperpowersIds(
    payload: Partial<Hero>,
    id: number
  ): Observable<Hero> {
    const url = `${this.baseUrl}/heroes/${id}`;
    return this.http.patch<Hero>(url, payload, httpOptions);
  }

  deleteHero(id: number): Observable<void> {
    const url = `${this.baseUrl}/heroes/${id}`;
    return this.http.delete<void>(url);
  }
}
