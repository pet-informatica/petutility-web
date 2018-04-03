class Constants {
    constructor() {
        this.apiURL = process.env.NODE_ENV === "production" ? 'https://petutility-api.herokuapp.com/api':'http://localhost:3000/api';
    }
}

export default (new Constants());