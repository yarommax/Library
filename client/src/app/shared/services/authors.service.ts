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

    createAuthor(email: string, firstName: string, secondName: string): Observable<Author>{
        return this.http.post<Author>('/api/authors' , {
            'email': email,
            'firstName': firstName,
            'secondName': secondName
        })
    }

    updateAuthor(id: string ,email: string, firstName: string, secondName: string): Observable<Author>{
        return this.http.patch<Author>(`/api/authors/${id}` , {
            'id': id,
            'email': email,
            'firstName': firstName,
            'secondName': secondName
        })
    }

    delete(id: string): Observable<Message> {
        return this.http.delete<Message>(`/api/authors/${id}`)
    }
}