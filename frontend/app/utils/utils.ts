
import dayjs from "dayjs";
import type {Option, CustomOption} from "~/models/Option";

export const round = (num: number): number => Math.round(num * 100) / 100
export const durationConverter = (duration: number): string => {
    const hours = Math.floor(duration / 60)
    const minutes = duration - hours * 60
    return `${hours}hr, ${minutes}min`
}
export const dateConverter = (date: string): string => {
    const formatString = "ddd, MMM DD"
    return dayjs(date).format(formatString)
}

export const convertOptions = (options: Option[]): string[] => {
    const arr = new Array<string>()
    for (const option of options){
        arr.push(option.value)
    }
    return arr
}

export const convertStrArrToOptions = (strArr: string[]): Option[] => {
    const arr = new Array<Option>()
    for (const option of strArr){
        arr.push({label: option, value: option} as Option)
    }
    return arr
}

export const convertCustomOptions = <T>(options: CustomOption<T>[]): T[] => {
    const arr = new Array<T>()
    for (const option of options){
        arr.push(option.value)
    }
    return arr
}