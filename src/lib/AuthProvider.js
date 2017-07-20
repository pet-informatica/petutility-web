import Constants from './Constants';

class AuthProvider {
    constructor() {
        this.status = 'loading';
        this.loggedUser = null;
        this.onChangeHandler = null;
        this.loggedWithCookie = false;

        this.loginWithCookie = this.loginWithCookie.bind(this);
        this.loginWithUsernameAndPassword = this.loginWithUsernameAndPassword.bind(this);
        this.logout = this.logout.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async loginWithCookie() {
        var pStatus = this.status;
        try {
            var response = await fetch(Constants.apiURL + '/petiano/login', {
                credentials: 'include'
            })
            if(response.status === 200) {
                this.status = 'logged';
                this.loggedUser = await response.json();
            } else if(response.status === 403) {
                this.status = 'noCookie';
                this.loggedUser = null;
            } else {
                this.status = 'failed';
                this.loggedUser = null;
            }
        } catch(err) {
            console.error(err)
            this.status = 'failed';
            this.loggedUser = null;
        }
        if(this.status !== pStatus && this.onChangeHandler) 
            this.onChangeHandler({
                status: this.status,
                user: this.loggedUser
            });
    }
    
    async loginWithUsernameAndPassword(username, password) {
        var pStatus = this.status;
        var _self = this;
        try {
            var response = await fetch(`${Constants.apiURL}/petiano/login?username=${username}&password=${password}`, {
                credentials: 'include'
            });
            if(response.status === 200) {
                _self.status = 'logged';
                _self.loggedUser = await response.json();
            } else if(response.status === 403) {
                _self.status = 'noCookie';
                _self.loggedUser = null;
            } else {
                _self.status = 'failed';
                _self.loggedUser = null;
            }
        } catch(err) {
            console.error(err)
            _self.status = 'failed';
            _self.loggedUser = null;
        }
        if(_self.status !== pStatus && _self.onChangeHandler)
            _self.onChangeHandler({
                status: _self.status,
                user: _self.loggedUser
            });
    }

    async logout() {
        var _self = this;
        var pStatus = _self.status;
        try {
            var response = await fetch(`${Constants.apiURL}/petiano/logout`, {
                credentials: 'include'
            });
            if(response.status === 200) {
                _self.status = 'left';
                _self.loggedUser = null;
            } else {
                _self.status = 'failed';
                _self.loggedUser = null;
            }
        } catch(err) {
            console.error(err);
            _self.status = 'failed';
            _self.loggedUser = null;
        }
        if(_self.status !== pStatus && _self.onChangeHandler)
            _self.onChangeHandler({
                status: _self.status,
                user: _self.loggedUser
            });
    }
    
    onChange(callback) {
        this.onChangeHandler = callback;
        if(callback)
            callback({
                status: this.status,
                user: this.loggedUser
            })
        if(!this.loggedWithCookie) {
            this.loggedWithCookie = true;
            this.loginWithCookie();
        }
    }

}

export default new AuthProvider();