export type register = {
    full_name: string,
    email: string,
    password: string
};

export type login = {
    email: string,
    password: string
};

export type verify = {
    email: string
};