import API from '../lib/API';

class AbsentOrLateFactory {

    static resource = 'absentOrLate';

    static async create(absentOrLate) {
        let data = await API.request(`/${this.resource}`, 'POST', absentOrLate);
        return await data.json();
    }

    static async update(absentOrLate) {
        let data = await API.request(`/${this.resource}/${absentOrLate.Id}`, 'PUT', absentOrLate);
        return await data.json();
    }

    static async delete(id) {
        let data = await API.request(`/${this.resource}/${id}`, 'DELETE');
        return data.status === 200;
    }

}

export default AbsentOrLateFactory;