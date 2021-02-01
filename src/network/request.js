import axios from "axios";

export function request(config) {

    const instance = axios.create({
        method: 'POST',
        baseURL: 'http://192.168.3.13:8083/teacher',
        timeout: 5000
    })
    return instance(config)
}