import { toast } from 'react-toastify'


const customToastId = "customToastId";

function validateEmail(email) {
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (email.length < 3 || !emailRegex.test(email)) {
        toast.error("Invalid Email",
            { toastId: customToastId }
        )
        return false;
    }
    return true;
}
function validateName(name) {
    if (name.length < 3) {
        toast.error(
            "Invalid Name",
            {
                toastId: customToastId
            }
        )
        return false;
    }
    return true;
}

function validatePassword(password) {
    if (password.length < 5) {
        toast.error(
            "Password must have 6 characters",
            {
                toastId: customToastId
            }
        )
        return false;
    }
    return true;
}

function validateRegistrationForm({ email, password, name }) {
    if (!validateName(name)) return false;
    if (!validateEmail(email)) return false;
    if (!validatePassword(password)) return false;
    return true;
}
function validateLoginForm({ email, password }) {
    if (!validateEmail(email)) return false;
    if (!validatePassword(password)) return false;
    return true;

}

function validateCreatePasswordForm({ password, repeatPassword }) {
    if (!validatePassword(password)) return false
    if (password !== repeatPassword) {
        toast.error(
            "Passwords do not match",
            {
                toastId: customToastId
            }
        )
        return false;
    }
    return true;
}






let validators = {
    validateRegistrationForm,
    validateLoginForm,
    validateEmail,
    validateCreatePasswordForm
}
export default validators