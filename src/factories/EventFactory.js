import API from '../lib/API';

class EventFactory {

    static resource = 'events';

    static async query() {
        let data = await API.request(`/${this.resource}`, 'GET');
        return await data.json();
    }

    static async create(event) {
        let data = await API.request(`/${this.resource}`, 'POST', event);
        return await data.json();
    }

    static async update(event) {
        let data = await API.request(`/${this.resource}/${event.Id}`, 'PUT', event);
        return await data.json();
    }

    static async delete(eventId) {
        return await API.request(`/${this.resource}/${eventId}`, 'DELETE');
    }

}

export default EventFactory;