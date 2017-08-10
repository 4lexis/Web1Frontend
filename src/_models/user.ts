enum Role {
    Admin,
    Moderator, 
    Regular
}


export class User {
    Id: number;
    Username: string;
    Password: string;
    Name: string;
    LastName: string;
    Role: Role;
    Phone: string;
    Email: string;
    RegistrationTime: Date;
}