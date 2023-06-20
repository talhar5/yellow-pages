import { toast } from "react-toastify"

const customToastId = "customToastId";
function pending(text) {
    toast.loading(text,
        { toastId: customToastId })
}
function resolve(text) {
    toast.update(
        customToastId,
        {
            render: text,
            type: "success",
            isLoading: false,
            autoClose: 1500
        }
    )
}

function reject(text) {
    toast.update(
        customToastId,
        {
            render: text,
            type: "error",
            isLoading: false,
            autoClose: 1500
        }
    )
}

function error(text) {
    toast.error(text, {toastId: customToastId})
}
function success(text) {
    toast.success(text, {toastId: customToastId})
}



let customToasts = {
    pending,
    resolve,
    reject,
    error,
    success,
}
export default customToasts;