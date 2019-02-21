import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author, Message, Book } from '../interfaces';
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

    getAuthorById(id: string): Observable<Book> {
        return this.http.get<Book>(`/api/book/${id}`)
    }

    createBook(book: Book): Observable<Author>{
        const body = {
            'name' : book.name,
            'publishing' : book.publishing,
            'ebook' : book.ebook,
            'year': book.year,
            'isbn': book.isbn,
            'pages': book.pages,
        }
        return this.http.post<Author>('/api/books' , body)
    }

    updateBook(id: string ,email: string, firstName: string, secondName: string): Observable<Author>{
        return this.http.patch<Author>(`/api/books/${id}` , {
            'id': id,
            'email': email,
            'firstName': firstName,
            'secondName': secondName
        })
    }

    delete(id: string): Observable<Message> {
        return this.http.delete<Message>(`/api/books/${id}`)
    }
}