import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message, Book } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class BooksService {
    constructor(private http: HttpClient) {}

    //Запрос к серверу - получить все книги
    fetch(): Observable<Book[]> {
        return this.http.get<Book[]>('/api/books')
    }

    getBookById(id: string): Observable<Book> {
        return this.http.get<Book>(`/api/books/${id}`)
    }

    createBook(book): Observable<Book>{               
        return this.http.post<Book>('/api/books' , book)
    }

    updateBook(id: string , body): Observable<Book>{
        body.id = id
        return this.http.patch<Book>(`/api/books/${id}` , body)
    }

    delete(id: string): Observable<Message> {
        return this.http.delete<Message>(`/api/books/${id}`)
    }
}