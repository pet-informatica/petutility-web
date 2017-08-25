import API from '../lib/API';

class PETianoFactory {

    static resource = 'petianos'

    static async query() {
        let data = await API.request(`/${this.resource}/`, 'GET');
        return await data.json();
    }

    static async get(id) {
        let data = await API.request(`/${this.resource}/${id}`, 'GET');
        return await data.json();
    }

    static async update(PETiano) {
        let data = await API.upload(`/${this.resource}/`, 'PUT', PETiano);
        return await data.json();
    }

    static async create(body) {
        let data = await API.request(`/${this.resource}/`, 'POST', body);
        return await data.json();
    }

}

export default PETianoFactory;