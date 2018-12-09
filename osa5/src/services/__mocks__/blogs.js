const blogs = [
    {
        id: '5b3bab464991a51a235d40bb',
        title: 'Kuinka saisin rikki kookospähkinän?',
        author: 'M.A. Numminen',
        url: 'www.manumminen.com',
        likes: 2,
        user: {
            _id: '5b3bab454991a51a235d40b9',
            username: 'mluukkai',
            name: 'Matti Luukkainen'
        }
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll, blogs }