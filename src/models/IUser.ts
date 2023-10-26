export interface IAuthUser {
    username: string,
    password: string
}

export interface IUser {
    id?: number,
    username: string,
    balance: number,
    marsians: number,
    is_banned: boolean,
    vip: string,
    youtuber: string,
    ref_counter: number,
}
