export class User{

    id:string;
    public user_name:string;
    private email:string;
    public role:string="user";
    public password:string;
    // private issueDate:Date;
    // private returnDate:Date;

    User(user:User){
        this.user_name = user.user_name;
        this.email=user.email;
        this.password=user.password;
    }

}