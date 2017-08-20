import PETianoFactory from '../factories/PETianoFactory';

class PETianoService {

    constructor() {
        // map
        this.PETianos = {};
    }

    /**
     * Caso possua o PETiano em cache,
     * retornar o mesmo e caso não,
     * carregar o PETiano em cache e retornar
     * @param {user id} id 
     */
    async get(id) {
        if (!this.PETianos[id])
            this.PETianos[id] = await PETianoFactory.get(id);
        return this.PETianos[id];
    }

    /**
     * Adiciona/Atualiza um PETiano no servidor
     * e depois na cache
     * @param {user data} PETiano 
     */
    async update(PETiano) {
        this.PETianos[PETiano.Id] = await PETianoFactory.update(PETiano);
    }

    /**
     * Adiciona/Atualiza um PETiano na cache
     * @param {user data} PETiano 
     */
    set(PETiano) {
        this.PETianos[PETiano.Id] = PETiano;
    }

}

export default (new PETianoService());