export interface User {
    email: string
    password: string
}

export interface Author {
    email: string
    firstName: string
    secondName: string
    birthDate: Date
    user?: string
    _id?: string
}

export interface Book {
    name: string
    publishing: string
    ebook: boolean
    year: Date
    isbn: string
    pages: number
    user?: string
    _id?: string
}

export interface Message {
    message: string
}