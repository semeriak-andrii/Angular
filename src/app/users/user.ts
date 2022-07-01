export class User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    isSelected: boolean;

    constructor(user: any) {
        this.id = user['id'];
        this.name = user['name'];
        this.username = user['username'];
        this.email = user['email'];
        this.phone = user['phone'];
        this.isSelected = false;
    }

}
