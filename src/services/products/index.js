import axios from 'axios';

const dataPath = '/data/products.json';

export default {
    getAll() {
        return axios.get(dataPath).then(x => x.data);
    },

    getByCategory(id) {
        return axios.get(dataPath).then(x => {
            return x.data.products.filter(prod => prod.sublevel_id === Number.parseInt(id));
        });
    }
}