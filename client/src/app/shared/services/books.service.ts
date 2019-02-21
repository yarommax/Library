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

    createBook(name: string, publishing: string,ebook: boolean, year: Date, isbn: string, pages:number): Observable<Book>{
        const body = {
            'name' : name,
            'publishing' : publishing,
            'ebook' : ebook,
            'year': year,
            'isbn': isbn,
            'pages': pages,
        }
        return this.http.post<Book>('/api/books' , body)
    }

    updateBook(id: string , name: string, publishing: string,ebook: boolean, year: Date, isbn: string, pages:number): Observable<Book>{
        const body = {
            'name' : name,
            'publishing' : publishing,
            'ebook' : ebook,
            'year': year,
            'isbn': isbn,
            'pages': pages,
        }

        return this.http.patch<Book>(`/api/books/${id}` , body)
    }

    delete(id: string): Observable<Message> {
        return this.http.delete<Message>(`/api/books/${id}`)
    }
}