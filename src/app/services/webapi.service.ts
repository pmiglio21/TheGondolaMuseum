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

    GetAllDistinctTags() {
        return this.http.get("https://localhost:7290/GondolaVideo/GetAllDistinctTags", { responseType: 'text' });
    }

    GetMultipleByTag(tag: string) {
        const params = { tag }; // Create query parameters

        return this.http.get("https://localhost:7290/GondolaVideo/GetMultipleByTag", { params, responseType: 'text' });
    }   

    GetSingleByVideoId(videoId: number) {
        const params = { videoId }; // Create query parameters

        return this.http.get("https://localhost:7290/GondolaVideo/GetSingleByVideoId", { params, responseType: 'text' });
    }
}