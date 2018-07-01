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
    console.log(token)
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

export default { getAll, createNewBlog }