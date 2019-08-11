export class Book {
    id: string;
    // tslint:disable-next-line:variable-name
    public book_Name: string;
    public author: string;
    // tslint:disable-next-line:variable-name
    private book_type: string;
    private edition: string;
    private price: number;

    public quantity: number;

    Book(book: Book) {
        this.book_Name = book.book_Name;
        this.author = book.author;
        this.book_type = book.book_type;
        this.quantity = book.quantity;
        this.edition = book.edition;
        this.price = book.price;
    }
}
