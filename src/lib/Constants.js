class Constants {
    constructor() {
        this.apiURL = process.env.NODE_ENV === "production" ? 'https://petutilityteste.herokuapp.com/api':'http://localhost/api';
    }
}

export default (new Constants());