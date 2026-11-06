import { useState } from "react";
import GeneralSettingsForm, {generalFormAction,} from "~/components/forms/GeneralSettingsForm";
import EmailSettingsForm, {emailFormAction,} from "~/components/forms/EmailSettingsForm";
import OtherSettingsForm, {otherFormAction} from "~/components/forms/OtherSettingsForm";
import type { Route } from "../../.react-router/types/app/routes/+types/_loggedin.settings";

type SettingSubPages = "general" | "email" | "other";

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const form = formData.get("form");

    switch (form) {
        case "general":
            return generalFormAction(formData);
        case "email":
            return emailFormAction(formData);
        case "other":
            return otherFormAction(formData);
        default:
            return null;
    }
}

const pages: {
    id: SettingSubPages;
    label: string;
    description: string;
    icon: React.ReactNode;
}[] = [
    {
        id: "general",
        label: "General",
        description: "Your preferences",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m0 0v10m6-14V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m0 0v10M6 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m0 0v10" />
            </svg>
        ),
    },
    {
        id: "email",
        label: "Email",
        description: "Notifications and alerts",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m3 7 9 6 9-6" />
            </svg>
        ),
    },
    {
        id: "other",
        label: "Other",
        description: "Additional settings",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <circle cx="12" cy="12" r="3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1-1.7 2.9-.2-.1a1.7 1.7 0 00-1.8.1l-.1.1h-3.4l-.1-.2a1.7 1.7 0 00-1.5-1l-.2.1-3-1.7.1-.2a1.7 1.7 0 00-.1-1.8l-.1-.1v-3.4l.2-.1a1.7 1.7 0 001-1.5l-.1-.2 1.7-3 .2.1a1.7 1.7 0 001.8-.1l.1-.1h3.4l.1.2a1.7 1.7 0 001.5 1l.2-.1 3 1.7-.1.2a1.7 1.7 0 00.1 1.8l.1.1V15z" />
            </svg>
        ),
    },
];

export default function SettingsPage() {
    const [subPage, setSubPage] = useState<SettingSubPages>("general");

    const activePage = pages.find((page) => page.id === subPage)!;

    return (
        <div className="relative z-20 flex min-h-full w-full flex-col px-4 py-8 sm:px-6 lg:px-10">

            {/* Page Header */}
            <div className="mx-auto mb-8 w-full max-w-6xl">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span>Account</span>
                    <span>/</span>
                    <span className="text-indigo-400">Settings</span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Settings
                </h1>

                <p className="mt-2 text-sm text-slate-400 sm:text-base">
                    Manage your preferences and customize your experience.
                </p>
            </div>

            {/* Settings Layout */}
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">

                {/* Navigation */}
                <aside className="rounded-2xl border border-white/[0.08] bg-[#0D1221]/80 p-3 shadow-xl shadow-black/10 backdrop-blur-xl">

                    <p className="mb-3 px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        Preferences
                    </p>

                    <nav className="flex gap-2 overflow-x-auto lg:flex-col">
                        {pages.map((page) => {
                            const isActive = subPage === page.id;

                            return (
                                <button
                                    key={page.id}
                                    type="button"
                                    onClick={() => setSubPage(page.id)}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`flex min-w-fit flex-1 items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 lg:w-full lg:flex-none ${
                                        isActive
                                            ? "border border-indigo-400/20 bg-indigo-500/10 text-indigo-300 shadow-sm"
                                            : "border border-transparent text-slate-400 hover:bg-white/[0.04] hover:text-white"
                                    }`}
                                >
                                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                        isActive
                                            ? "bg-indigo-500/15 text-indigo-400"
                                            : "bg-white/[0.04] text-slate-500"
                                    }`}>
                                        {page.icon}
                                    </span>

                                    <span className="min-w-0">
                                        <span className="block text-sm font-semibold">
                                            {page.label}
                                        </span>
                                        <span className="hidden text-[11px] text-slate-500 lg:block">
                                            {page.description}
                                        </span>
                                    </span>

                                    {isActive && (
                                        <svg
                                            className="ml-auto hidden h-4 w-4 lg:block"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Content Panel */}
                <section className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D1221]/80 shadow-xl shadow-black/10 backdrop-blur-xl">

                    {/* Panel Header */}
                    <div className="flex items-center gap-4 border-b border-white/[0.08] px-5 py-5 sm:px-7">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-400/10 bg-indigo-500/10 text-indigo-400">
                            {activePage.icon}
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-white">
                                {activePage.label} Settings
                            </h2>
                            <p className="mt-0.5 text-xs text-slate-500">
                                {activePage.description}
                            </p>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="min-w-0 p-4 sm:p-7">
                        {(() => {
                            switch (subPage) {
                                case "general":
                                    return <GeneralSettingsForm />;
                                case "email":
                                    return <EmailSettingsForm />;
                                case "other":
                                    return <OtherSettingsForm />;
                            }
                        })()}
                    </div>
                </section>
            </div>
        </div>
    );
}
