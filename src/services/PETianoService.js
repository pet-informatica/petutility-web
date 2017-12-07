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
    async loadAll() {
        let data = await PETianoFactory.query();
        await data.forEach(user => this.PETianos.set(user.Id, user));
    }

    /**
     * Converte o map de PETianos para um array
     * e o retorna
     * @returns { Array } lista com PETianos
     */
    async getAsArray() {
        let ret = [];
        await this.PETianos.forEach((val, key, map) => {
            ret.push(val);
        });
        await ret.sort((a, b) => {
            if (a.Name > b.Name)
                return 1;
            if (a.Name < b.Name)
                return -1;
            return 0;
        });
        return ret;
    }

    /**
     * Caso possua o PETiano em cache,
     * retornar o mesmo e caso não,
     * carregar o PETiano em cache e retornar
     * @param { number } id do PETiano
     * @returns { any } PETiano
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

    /**
     * Convida um PETiano ao sistema com base no seu email
     * @param { string } email 
     */
    async invite(email) {
        let data = await PETianoFactory.create({email: email});
        this.PETianos.set(data.Id, data);
    }

}

export default (new PETianoService());