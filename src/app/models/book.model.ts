export class Book{
   
    id : string;
    public book_Name:string;
    public author:string;
    
    private book_type:string;
    private book_image_url:string;
    private edition:string;
    private price:number;

    // private addDate:Date;
    // private issueDate:Date;
    // private returnDate:Date;

    public quantity:number;

    // private borrowed_book_qt:number;
    
    
    

    Book(book :Book){
        this.book_Name=book.book_Name;
        this.author=book.author;
        this.book_type=book.book_type;
        this.quantity=book.quantity;
        this.edition=book.edition;
        this.price=book.price;
        this.book_image_url=book.book_image_url;
    }
    
}