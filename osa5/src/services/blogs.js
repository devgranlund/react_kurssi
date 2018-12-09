import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createNewBlog = async ( newObject , token) => {
    const config = {
        headers: { 'Authorization': 'bearer ' + token }
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const updateBlog = async ( existingObject, token) => {
    const config = {
        headers: { 'Authorization': 'bearer ' + token }
    }
    const response = await axios.put(baseUrl + '/' + existingObject.id, existingObject, config)
    return response.data
}

const deleteBlog = async ( objectToBeDeleted, token) => {
    const config = {
        headers: { 'Authorization': 'bearer ' + token }
    }
    const response = await axios.delete(baseUrl + '/' + objectToBeDeleted.id, config)
    return response.data
}

export default { getAll, createNewBlog, updateBlog, deleteBlog }