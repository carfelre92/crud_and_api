import axios from 'axios';

let url = 'http://localhost:3003/api';

let apiInfo = {
    serverUrl : 'http://localhost:3003/',

    //CRUD for projectSchema

    getProjects : () => {
        return axios.get(url + '/projects')
    },

    addProject : (data) => {
        return axios.post(url + '/projects', data)
    },

    deleteProject : (id) => {
        return axios.delete(url + '/projects/' + id)         
    },

    updateProject : (id, data) => {
        return axios.put(url + '/projects/' + id, data)
    },

    getUser : (id) => {
        return axios.get(url + '/users/' + id)
    },

    postUser : (data) =>{
        return axios.post(url+'/users',data)
    }
}

export default apiInfo;