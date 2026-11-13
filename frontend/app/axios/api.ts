import axios from 'axios'

console.log("backend url: ", process.env.BACKEND_URL)
const api = axios.create({
    baseURL: "http://localhost:3129",
    headers: {
        "Content-Type": "application/json",
    }
})

export default api