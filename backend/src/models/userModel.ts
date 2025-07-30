export interface User {
    name: string;
    surname: string;
    email: string;
    passwordHash: string;
}

export const users: User[] = [];