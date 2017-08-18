import PETianoFactory from '../factories/PETianoFactory';

class PETianoService {

    constructor() {
        // map
        this.PETianos = {};
    }

    async get(id) {
        if (!this.PETianos[id])
            this.PETianos[id] = await PETianoFactory.get(id);
        return this.PETianos[id];
    }

}

export default (new PETianoService());