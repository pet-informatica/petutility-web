class Constants {
    constructor() {
        this.apiURL = process.env.API_URL || 'http://localhost:80/api';
    }
}

export default (new Constants());