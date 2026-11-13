import type {Deal} from "~/models/Deal";

export type DealGroup = {
    name : string,
    deals: Array<Deal>,
}