import axios from 'axios'
import { store } from './store'

window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.baseURL = process.env.API_URL
window.axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.authToken}`
window.axios.defaults.withCredentials = true


