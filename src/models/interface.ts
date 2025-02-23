
export interface IUserModelAttributes {
    id?: number;
    name: string;
    phoneNumber: string
    email: string
    password: string
}


export interface ISpamModelAttributes {
    id?: number;
    phoneNumber: string;
    spamCount: string;
}

export interface IContactModelAttributes {
    id?: number;
    name: string;
    phoneNumber: string;
    userId: number;
}
