import API from '../lib/API';

class PETianoFactory {

    static async get(id) {
        return await API.request(`/petiano/${id}`, 'GET');
    }

}

export default PETianoFactory;