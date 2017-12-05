import API from '../lib/API';

class AgendaPointFactory {

    static resource = 'agendaPoint';

    static async query() {
        let data = await API.request(`/${this.resource}`, 'GET');
        return await data.json();
    }

    static async get(id) {
        let data = await API.request(`/${this.resource}/${id}`, 'GET');
        return await data.json();
    }

    static async create(agendaPoint) {
        let data = await API.request(`/${this.resource}`, 'POST', agendaPoint);
        return await data.json();
    }

    static async update(agendaPoint) {
        let data = await API.request(`/${this.resource}/${agendaPoint.Id}`, 'PUT', agendaPoint);
        return await data.json();
    }

    static async delete(id) {
        let data = await API.request(`/${this.resource}/${id}`, 'DELETE');
        return data.status === 200;
    }

}

export default AgendaPointFactory;