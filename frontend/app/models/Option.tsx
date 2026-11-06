export type Option = {
    value: string;
    label: string;
};

export type CustomOption<T> = {
    value: T,
    label: string;
}