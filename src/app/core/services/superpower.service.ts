import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Superpower } from '../interfaces';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class SuperpowerService {
  private readonly baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000';
  }
  getSuperpowers(): Observable<Superpower[]> {
    const url = `${this.baseUrl}/superpowers`;
    return this.http.get<Superpower[]>(url);
  }

  getSuperpowersByIds(ids: number[]): Observable<Superpower[]> {
    const url = `${this.baseUrl}/superpowers?${ids
      .map((id) => 'id=' + id)
      .join('&')}`;
    return this.http.get<Superpower[]>(url);
  }
  // [1,2,3] trebuie sa ajungem aici pt a vedea superputerile filtrate de pe server
  postPower(data: any) {
    return this.http.post<any>('http://localhost:3000/superpowers/', data);
  }
  putPower(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/superpowers/' + id, data);
  }
  updatePower(
    payload: Partial<Superpower>,
    powerId: number
  ): Observable<Superpower> {
    const url = `${this.baseUrl}/superpowers/${powerId}`;

    return this.http.patch<Superpower>(url, payload, httpOptions);
  }
  getSuperpower(id: number): Observable<Superpower> {
    const url = `${this.baseUrl}/superpowers/${id}`;
    return this.http.get<Superpower>(url);
  }

  deleteSuperpower(id: number): Observable<void> {
    const url = `${this.baseUrl}/superpowers/${id}`;
    return this.http.delete<void>(url);
  }
  addSuperpower(power: Superpower): Observable<Superpower> {
    const url = `${this.baseUrl}/superpowers`;
    return this.http.post<Superpower>(url, power, httpOptions);
  }
}
