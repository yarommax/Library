import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author, Message } from '../interfaces';
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

    getAuthorById(id: string): Observable<Author> {
        return this.http.get<Author>(`/api/authors/${id}`)
    }

    createAuthor(author): Observable<Author>{
        return this.http.post<Author>('/api/authors' , author)
    }

    updateAuthor(id: string , author): Observable<Author>{
        author.id = id
        return this.http.patch<Author>(`/api/authors/${id}` , author)
    }

    delete(id: string): Observable<Message> {
        return this.http.delete<Message>(`/api/authors/${id}`)
    }
}