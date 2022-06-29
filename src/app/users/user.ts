export class User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    isSelected: boolean;

    constructor(user: any) {
        this.id = user['id'];
        this.firstname = user['firstname'];
        this.lastname = user['lastname'];
        this.email = user['email'];
        this.phone = user['phone'];
        this.isSelected = false;
    }
}