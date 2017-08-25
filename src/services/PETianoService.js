import PETianoFactory from '../factories/PETianoFactory';

class PETianoService {

    constructor() {
        // map
        this.PETianos = new Map();
    }

    /**
     * Pega todos os PETianos do servidor
     * e armazena em cache
     */
    async getAll() {
        let data = await PETianoFactory.query();
        await data.forEach(user => this.PETianos.set(user.Id, user));
        return data;
    }

    /**
     * Caso possua o PETiano em cache,
     * retornar o mesmo e caso não,
     * carregar o PETiano em cache e retornar
     * @param {user id} id 
     */
    async get(id) {
        if (!this.PETianos[id])
            this.PETianos.set(id, await PETianoFactory.get(id));
        return this.PETianos.get(id);
    }

    /**
     * Adiciona/Atualiza um PETiano no servidor
     * e depois na cache
     * @param {user data} PETiano 
     */
    async update(PETiano) {
        this.PETianos.set(PETiano.Id, await PETianoFactory.update(PETiano));
    }

    /**
     * Adiciona/Atualiza um PETiano na cache
     * @param {user data} PETiano 
     */
    set(PETiano) {
        this.PETianos.set(PETiano.Id, PETiano);
    }

    async invite(email) {
        let data = await PETianoFactory.create({email: email});
        this.PETianos.set(data.Id, data);
    }

}

export default (new PETianoService());