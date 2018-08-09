import { observable, action } from "mobx";
import { loginStatus } from '../core/constants';
import { loginService } from '../core/services/LoginService';

class AppState {
    @observable currentLoginStatus;
    @observable loginError;

    constructor() {
        this.currentLoginStatus = loginStatus.loggedOut;
    }

    @action login = async (userName, password) => {
        this.currentLoginStatus = loginStatus.loggingIn;
        this.loginError = null;
        const data = await loginService.login(userName, password)
        .catch(err => {
            this.loginError = 'An error occured while login, please make sure the server is runnning.'
        });
        if (data) {
            if(data.success) {
                this.currentLoginStatus = loginStatus.loggedIn;
            } else {
                this.currentLoginStatus = loginStatus.loggedOut;
                this.loginError = data.errorMessage;
            }
        }
        
    }

    @action logout() {
        this.currentLoginStatus = loginStatus.loggingOut;
        setTimeout(() => {
            this.currentLoginStatus = loginStatus.loggedOut;
        }, 2000);
    }
}

export const appState = new AppState(); 
