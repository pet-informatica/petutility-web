import API from '../lib/API';

class PETianoFactory {

    static resource = 'petianos'

    static async get(id) {
        let data = await API.request(`/${this.resource}/${id}`, 'GET');
        return await data.json();
    }

    static async update(PETiano) {
        let data = await API.upload(`/${this.resource}/`, 'PUT', PETiano);
        return await data.json();
    }

}

export default PETianoFactory;