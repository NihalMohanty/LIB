export class User {

    id: string;
    // tslint:disable-next-line:variable-name
    public user_name: string;
    private email: string;
    public role = 'user';
    public password: string;

    User(user: User) {
        this.user_name = user.user_name;
        this.email = user.email;
        this.password = user.password;
    }
}
