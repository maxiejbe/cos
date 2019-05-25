import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest';

const API_URL = process.env.REACT_APP_API_URL;
const ADMIN_ROLE = 'admin';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { email, password, name, register } = params;
        
        let registerRequest = Promise.resolve({status: 200});
        if (register){
            registerRequest = new Promise((resolve, reject) => {
                return fetch(new Request(API_URL + '/users', {
                    method: 'POST',
                    body: JSON.stringify({ email, password, name }),
                    headers: new Headers({ 'Content-Type': 'application/json' }),
                })).then(registerRes =>  
                    registerRes.json().then(registerData => ({status: registerRes.status, body: registerData})))
                .then(resolve).catch(reject)
            }) 
        }
        
        const loginRequest = new Request(API_URL + '/auth', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })

        return registerRequest
            .then(registerResult => {
                if (registerResult.status < 200 || registerResult.status >= 300) {
                    throw new Error(registerResult.body.err);
                }
                return fetch(loginRequest);
            })
            .then(loginRes => 
                loginRes.json().then(loginData => ({status: loginRes.status, body: loginData})))
            .then(loginResult => {
                if (loginResult.status < 200 || loginResult.status >= 300) {
                    throw new Error(loginResult.body.err);
                }
                localStorage.setItem('token', loginResult.body.token);
            })
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    }
    return Promise.resolve();
}