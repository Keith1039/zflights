export type Option = {
    value: string;
    label: string;
};

export type CustomOption<T> = {
    value: T,
    label: string;
}

export enum BatchEmailOpts {
    NO_BATCH = "NO_BATCH",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    QUARTERLY = "QUARTERLY",
}

export const options: CustomOption<BatchEmailOpts>[] = [
    { value: BatchEmailOpts.NO_BATCH, label: "No batching" },
    { value: BatchEmailOpts.WEEKLY, label: "Weekly" },
    { value: BatchEmailOpts.MONTHLY, label: "Monthly" },
    { value: BatchEmailOpts.QUARTERLY, label: "Quarterly" },
];

// set it
export const optionMap = new Map<BatchEmailOpts, CustomOption<BatchEmailOpts>>();
for (const option of options) {
    optionMap.set(option.value, option)
}