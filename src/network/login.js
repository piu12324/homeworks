import {request} from "./request";

export function login(num,pwd) {

    return request({
        url: '/verify',
        params: {
         num, pwd
        }
    })
}