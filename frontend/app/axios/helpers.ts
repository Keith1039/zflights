import {toast} from "react-toastify";
import api from "~/axios/api";

export const associateDeal = async (dealId: number, onSuccess: () => void) => {
    const res = await toast.promise(
        api.post("/deals/add", {deal_id: dealId}),
        {
            pending: "adding deal...",
            success: "deal successfully added!",
            error: "update failed. Please try again later.",
        }
    )
    if (res.status === 200) {
        onSuccess()
    }
}

export const dissociateDeal = async (dealId: number,  onSuccess: () => void) => {
    const res = await toast.promise(
        api.post("/deals/delete", {deal_id: dealId}),
        {
            pending: "removing deal...",
            success: "deal successfully removed!",
            error: "update failed. Please try again later.",
        }
    )
    if (res.status === 200) {
        onSuccess()
    }
}