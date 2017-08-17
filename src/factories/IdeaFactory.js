import API from '../lib/API';

class IdeasFactory {

    static resource = 'ideas';

    static async query() {
        return await API.request(`/${IdeasFactory.resource}`, 'GET');
    }

    static async create(idea) {
        return await API.request(`/${IdeasFactory.resource}`, 'POST', idea);
    }

    static async update(idea) {
        return await API.request(`/${IdeasFactory.resource}/${idea.Id}`, 'PUT', idea);
    }

    static async delete(ideaId) {
        return await API.request(`/${IdeasFactory.resource}/${ideaId}`, 'DELETE');
    }

}

export default IdeasFactory;