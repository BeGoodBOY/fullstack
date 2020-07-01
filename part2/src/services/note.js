import axios from 'axios'

const baseUrl = `http://localhost:3001/notes`

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newNote => {
    return axios.post(baseUrl, newNote)
}

const update = (id, newNote) => {
    return axios.put(`${baseUrl}/${id}`, newNote)
}

export default {
    getAll,
    create,
    update
}