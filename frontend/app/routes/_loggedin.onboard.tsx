import {useCallback, useEffect, useState} from "react";
import {
    Formity,
    type s,
    type Flow,
    type OnReturn,
    type ReturnOutput,
} from "@formity/react";
import api from "~/axios/api"
import type { Status, FormStatus } from "~/models/status";
import MSEmailSettingsForm from "~/components/forms/multistep/MSEmailSettingsForm"
import MSGeneralSettingsForm from "~/components/forms/multistep/MSGeneralSettingsForm"
import {BatchEmailOpts, type CustomOption, type Option, optionMap} from "~/models/Option";
import {convertOptions} from "~/utils/utils";
import {toast} from "react-toastify";
import type {EmailSettingsReq, GeneralSettingsReq} from "~/models/requests";
import {Navigate} from "react-router";

type Schema = {
    render: React.ReactNode;
    struct: [
        s.Form<{threshold: number, interestedCountries: Option[], departureAirports: Option[]}>,
        s.Form<{subscribed: boolean, batch_type: CustomOption<BatchEmailOpts>}>,
        s.Return<{threshold: number, interestedCountries: Option[], departureAirports: Option[], subscribed: boolean, batch_type: CustomOption<BatchEmailOpts>}>
    ],
    inputs: Record<never, never>,
    params: {
        status: FormStatus,
    }
}

const steps = [
    { label: "General", description: "Price threshold, countries and airports" },
    { label: "Email", description: "Notifications and batching" },
];

function StepShell({ step, children }: { step: number; children: React.ReactNode }) {
    const current = steps[step];

    return (
        <div className="relative z-20 flex min-h-full w-full flex-col px-4 py-8 sm:px-6 lg:px-10">

            {/* Page Header */}
            <div className="mx-auto mb-8 w-full max-w-3xl">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span>Welcome</span>
                    <span>/</span>
                    <span className="text-indigo-400">Setup</span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Please complete this before you access the website
                </h1>

                <p className="mt-2 text-sm text-slate-400 sm:text-base">
                    It only takes a minute. You can change any of these later in Settings.
                </p>
            </div>

            <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">

                {/* Stepper */}
                <nav
                    aria-label="Progress"
                    className="rounded-2xl border border-white/[0.08] bg-[#0D1221]/80 p-4 shadow-xl shadow-black/10 backdrop-blur-xl sm:p-5"
                >
                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        Step {step + 1} of {steps.length}
                    </p>

                    <ol className="flex items-center">
                        {steps.map((item, i) => {
                            const isActive = i === step;
                            const isDone = i < step;

                            return (
                                <li
                                    key={item.label}
                                    aria-current={isActive ? "step" : undefined}
                                    className={`flex items-center ${i < steps.length - 1 ? "flex-1" : ""}`}
                                >
                                    <span className="flex items-center gap-3">
                                        <span
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold transition-all duration-200 ${
                                                isActive
                                                    ? "border-indigo-400/20 bg-indigo-500/15 text-indigo-300"
                                                    : isDone
                                                        ? "border-indigo-400/10 bg-indigo-500/10 text-indigo-400"
                                                        : "border-transparent bg-white/[0.04] text-slate-500"
                                            }`}
                                        >
                                            {isDone ? (
                                                <svg
                                                    className="h-4 w-4"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            ) : (
                                                i + 1
                                            )}
                                        </span>

                                        <span className="hidden text-sm font-semibold sm:block">
                                            <span className={isActive ? "text-white" : isDone ? "text-slate-300" : "text-slate-500"}>
                                                {item.label}
                                            </span>
                                        </span>
                                    </span>

                                    {i < steps.length - 1 && (
                                        <span
                                            className={`mx-4 h-px flex-1 ${
                                                isDone ? "bg-indigo-400/40" : "bg-white/[0.08]"
                                            }`}
                                        />
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>

                {/* Content Panel */}
                <section className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D1221]/80 shadow-xl shadow-black/10 backdrop-blur-xl">

                    {/* Panel Header */}
                    <div className="flex items-center gap-4 border-b border-white/[0.08] px-5 py-5 sm:px-7">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-400/10 bg-indigo-500/10 text-lg font-semibold text-indigo-400">
                            {step + 1}
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-white">
                                {current.label} Settings
                            </h2>
                            <p className="mt-0.5 text-xs text-slate-500">
                                {current.description}
                            </p>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="min-w-0 p-4 sm:p-7">
                        {children}
                    </div>
                </section>
            </div>
        </div>
    );
}

const flow: Flow<Schema> = [
    {
        form: {
            fields: () => ({
                threshold: [Number(localStorage.getItem("threshold")) || 0, []],
                interestedCountries: [localStorage.getItem("interestedCountries") ? JSON.parse(localStorage.getItem("interestedCountries")!!) : [], []],
                departureAirports: [localStorage.getItem("departureAirports") ? JSON.parse(localStorage.getItem("departureAirports")!!) : [], []],
            }),
            render: ({fields, params, next}) => (
                <StepShell step={0}>
                    <MSGeneralSettingsForm
                        defaultValues={fields}
                        next={next}
                        status={params.status}
                    />
                </StepShell>
            ),
        },
    },
    {
        form: {
            fields: () => ({
                subscribed: [localStorage.getItem("subscribed") === "true" || false, []],
                batch_type: [optionMap.get(BatchEmailOpts[localStorage.getItem("batch_type") as keyof typeof BatchEmailOpts]) || optionMap.get(BatchEmailOpts.NO_BATCH)!!, []],
            }),
            render: ({fields, params, back, next}) => (
                <StepShell step={1}>
                    <MSEmailSettingsForm
                        defaultValues={fields}
                        back={back}
                        next={next}
                        status={params.status}
                    />
                </StepShell>
            )
        }
    },
    {
        return: ({ threshold, interestedCountries, departureAirports, subscribed, batch_type }) => ({
            threshold,
            interestedCountries,
            departureAirports,
            subscribed,
            batch_type,
        }),
    },
]

export default function () {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const [status, setStatus] = useState<Status<ReturnOutput<Schema>>>({
        type: "form",
        submitting: false,
    });

    const onReturn = useCallback<OnReturn<Schema>>(async (output) => {

        const initUser = async (generalParams: GeneralSettingsReq, emailParams: EmailSettingsReq) => {
            await  api.post("/settings/general/update", generalParams);
            await api.post("/settings/email/update", emailParams);
            await api.post("/user/activate", {});
        }

        setStatus({ type: "form", submitting: true });
        const params = {
            threshold: output.threshold,
            subscribed_countries: convertOptions(output.interestedCountries),
            relevant_airports: convertOptions(output.departureAirports)
        }

        const emailParams = {
            subscribed: output.subscribed,
            batch_type: output.batch_type.value.toString()
        }
        // update general settings
        try {
            await toast.promise(
                initUser(params, emailParams),
                {
                    pending: "beginning update...",
                    success: "settings successfully updated!",
                    error: "update failed. Please try again later.",
                }
            )
            setStatus({ type: "done", output });
        } catch (error) {
            // reset form
            setStatus({
                type: "form",
                submitting: false,
            })
        }
    }, []);

    if (!mounted) {
        return <div className="text-lg">Loading...</div>
    }

    if (status.type === "done") {
        return (
            <Navigate to="/map"/>
        );
    }

    return (
        <Formity<Schema> flow={flow} params={{ status }} onReturn={onReturn} />
    )
}