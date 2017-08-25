import API from '../lib/API';

class IdeasFactory {

    static resource = 'activities';

    static async query() {
        let data = await API.request(`/${this.resource}`, 'GET');
        return await data.json();
    }

    static async create(activity) {
        let data = await API.request(`/${this.resource}`, 'POST', activity);
        return await data.json();
    }

}

export default IdeasFactory;