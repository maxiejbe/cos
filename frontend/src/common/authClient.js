import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'admin-on-rest';

const componentActions = {
    Login: 'Login',
    Register: 'Register',
    RecoverPassword: 'RecoverPassword',
    ResetPassword: 'ResetPassword'
}

const API_URL = process.env.REACT_APP_API_URL;

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { email, password, name, action } = params;
        
        if (action === componentActions.ResetPassword) {
            fetch(new Request(API_URL + '/users/resetpassword', {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            })).then(resetPassRes =>  {
              return resetPassRes.json();  
            }).then(resetPassData => {
                console.log(resetPassData);
            });
            return;
        };
        

        let registerRequest = Promise.resolve({status: 200});
        if (action === componentActions.Register){
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
                localStorage.setItem('role', loginResult.body.user.role);
            })
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    }
    if (type === AUTH_GET_PERMISSIONS) {
        const role = localStorage.getItem('role');
        return role ? Promise.resolve(role) : Promise.reject();
    }
    return Promise.resolve();
}