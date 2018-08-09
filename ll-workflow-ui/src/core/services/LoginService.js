import { baseUrl } from '../constants';

class LoginService {
    async login(userName, password) {
        return new Promise(async (resolve, reject) => {
            const resp = await fetch(`${baseUrl}/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `userName=${userName}&password=${password}`
            }).catch(err => {
                reject(err);
            });
            resolve(resp && resp.json());

        });
    }
}

export const loginService = new LoginService();