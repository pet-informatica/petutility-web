import API from '../lib/API';

class RecordOfMeetingFactory {

    static resource = 'recordOfMeeting';

    static async query(query) {
        let data = await API.request(`/${this.resource}?${JSON.stringify(query)}`, 'GET');
        return await data.json();
    }

    static async get(id) {
        let data = await API.request(`/${this.resource}/${id}`, 'GET');
        return await data.json();
    }

    static async open() {
        let data = await API.request(`/${this.resource}`, 'POST', {});
        return await data.json();
    }

    static async close(id) {
        let data = await API.request(`/${this.resource}/${id}`, 'POST', {});
        return data.status === 200;
    }

    static async update(id, body) {
        let data = await API.request(`/${this.resource}/${id}`, 'PUT', body);
        return await data.json();
    }

}

export default RecordOfMeetingFactory;