import {ISkin} from "./ISkin.ts";

export interface ICase {
    id: number,
    name: string,
    price: number
    marsians: number
    image: string
    skins: ISkin[]
}