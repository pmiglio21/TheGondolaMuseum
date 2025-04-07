import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class WebApiService
{
    constructor(private http: HttpClient) {
        console.log('HttpClient is working!');
      }

    getStringFromWebApi() {
        return this.http.get("https://localhost:7290/GondolaMuseum", { responseType: 'text' });
    }
}