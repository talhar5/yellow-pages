import axios from "axios";
import { config } from "../config";

axios.defaults.baseURL = `${config.BASE_URL}/api/v1`;
axios.defaults.timeout = 15000;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("jwtToken")}`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = config.ORIGIN;
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
 

// /notes calls
// to get all notes for homepage
function getAllNotes() {
    return new Promise((resolve, reject) => {
        axios.get(`/notes/all/`)
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    })
}

function getOneNote({ noteId }) {
    return new Promise((resolve, reject) => {
        axios.get(`/notes/${noteId}`)
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    })
}


function createNote({ title, noteBody }) {
    return new Promise((resolve, reject) => {
        axios.post('/notes', { title, noteBody })
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    })
}

function updateNote({ noteId, title, noteBody }) {
    return new Promise((resolve, reject) => {
        axios.put("/notes", { noteId, title, noteBody })
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    })
}

function deleteNote({ noteId }) {
    return new Promise((resolve, reject) => {
        axios.delete(`/notes/${noteId}`)
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    })
}

// /auth calls
function loginUser({ email, password }) {
    return new Promise((resolve, reject) => {
        axios.post("/auth/login", { email, password })
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    })
}
function registerUser({ email, password, name }) {
    return new Promise((resolve, reject) => {
        axios.post("/auth/register", { email, password, name })
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    })
}

function verifyOtp({ email, otp }) {
    return new Promise((resolve, reject) => {
        axios.put("/auth/verifyOtp", { email, otp })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}

function resetPassword({ email }) {
    return new Promise((resolve, reject) => {
        axios.post("/auth/resetPassword", { email })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}

function createPassword({ email, password }) {
    return new Promise((resolve, reject) => {
        axios.post("/auth/createPassword", { email, password })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}




let axiosCalls = {
    createNote,
    deleteNote,
    loginUser,
    registerUser,
    getAllNotes,
    updateNote,
    getOneNote,
    verifyOtp,
    resetPassword,
    createPassword
}
export default axiosCalls;



