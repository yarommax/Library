import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthorsService {
    constructor(private http: HttpClient) {}

    //Запрос к серверу - получить всех авторов
    fetch(): Observable<Author[]> {
        return this.http.get<Author[]>('/api/authors')
    }

    getAuthorById(id: String): Observable<Author> {
        return this.http.get<Author>(`/api/authors/${id}`)
    }

    createAuthor(author): Observable<Author>{
        return this.http.post<Author>('/api/authors' , author)
    }

    updateAuthor() {

    }

    removeAuthor() {

    }
}