import API from '../lib/API';

class RecordOfMeetingFactory {

    static resource = 'recordOfMeeting';

    static async query(query) {
        let list = '';
        for (const key in query) {
            if (query.hasOwnProperty(key)) {
                const element = query[key];
                list+=`${key}=${element}&`;
            }
        }
        let data = await API.request(`/${this.resource}?${list}`, 'GET');
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
        return data.status === 200;
    }

}

export default RecordOfMeetingFactory;