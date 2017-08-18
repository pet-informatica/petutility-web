import API from '../lib/API';

class PETianoFactory {

    static resource = 'petianos'

    static async get(id) {
        let data = await API.request(`/${this.resource}/${id}`, 'GET');
        return await data.json();
    }

}

export default PETianoFactory;