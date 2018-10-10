import axios from 'axios';

const dataPath = '/data/categories.json';

let findDeep = function(data, id) {

    for( let i = 0; i < data.length; i++ ) {
        let cat = data[i];
        if ( cat.id === Number.parseInt(id) )
            return cat;
        else if (cat.sublevels) {
            let found = findDeep(cat.sublevels, id);
            if (found) return found;
        }
    }
};

export default {
    getAll() {
        return axios.get(dataPath).then(x => x.data);
    },

    get(id) {
        return axios.get(dataPath)
            .then(x => {
               return findDeep(x.data.categories, id);
            });
    }
}