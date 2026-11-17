import { Book } from "lucide-react";
import type { BookDto } from "~/lib/book-list/response-types";
import { BookCard } from "./ui/book-card";

interface BooksProps {
    books: BookDto[] | null;
}

export function BookList({ books }: BooksProps) {
    if (books == null || books.length < 1)
        return <div className="h-32">no hay libros</div>

    return (
        <div className="space-y-6">
            {books.map((book) => (
                <BookCard name ={book.title}/>
            ))}
        </div>
    );
}
