import API from '../lib/API';

class IdeasFactory {

    static resource = 'ideas';

    static async query() {
        let data = await API.request(`/${this.resource}`, 'GET');
        return await data.json();
    }

    static async create(idea) {
        let data = await API.request(`/${this.resource}`, 'POST', idea);
        return await data.json();
    }

    static async update(idea) {
        let data = await API.request(`/${this.resource}/${idea.Id}`, 'PUT', idea);
        return await data.json();
    }

    static async delete(ideaId) {
        return await API.request(`/${this.resource}/${ideaId}`, 'DELETE');
    }

}

export default IdeasFactory;