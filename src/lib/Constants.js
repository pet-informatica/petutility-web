class Constants {
    constructor() {
        this.apiURL = process.env.REACT_APP_BACK_URL || 'http://localhost:80/api';
    }
}

export default (new Constants());