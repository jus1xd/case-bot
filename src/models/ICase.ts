import {ISkin} from "./ISkin.ts";

export interface ICase {
    id: number,
    name: string,
    price: number
    image: string
    skins: ISkin[]
}