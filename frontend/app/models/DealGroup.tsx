import type {Deal} from "~/models/Deal";

export type DealGroup = {
    country : string,
    deals: Array<Deal>,
}