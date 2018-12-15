import blogService from '../services/blogs'

const initialState = {
    blogs: [],
    blogs_loading: false,
    blogs_error: null
}

const blogReducer = (store = initialState, action) => {
    switch(action.type) {
    case 'LOAD_BLOGS_SUCCESS':
        return action
    case 'LOAD_BLOGS_BEGIN':
        action.blogs = store.blogs
        return action
    case 'LOAD_BLOGS_FAILURE':
        action.blogs = store.blogs
        return action
    case 'NEW_BLOG':
        action.blogs = [...store.blogs, action.blog]
        return action
    case 'DELETE_BLOG':
        action.blogs = store.blogs.filter(blog => blog.id !== action.blog.id)
        return action
    case 'UPDATE_BLOG':
        action.blogs = store.blogs.map(blog => blog.id !== action.blog.id ? blog : action.blog)
        return action
    case 'COMMENT_BLOG':
        action.blogs = store.blogs.map(blog => blog.id !== action.blog.id ? blog : action.blog)
        return action
    default:
        return store
    }
}

export const initBlogs = () => {
    return async (dispatch) => {
        dispatch(
            { type: 'LOAD_BLOGS_BEGIN',
                blogs_loading: true,
                blogs_error: null })
        await blogService.getAll()
            .then(blogs => {
                dispatch({
                    type: 'LOAD_BLOGS_SUCCESS',
                    blogs: blogs,
                    blogs_loading: false,
                    blogs_error: null
                })
            })
            .catch(error => {
                dispatch({
                    type: 'LOAD_BLOGS_FAILURE',
                    blogs_loading: false,
                    blogs_error: error
                })
            })
    }
}

export const createBlog = (blogObject, userToken) => {
    return async (dispatch) => {
        dispatch(
            { type: 'LOAD_BLOGS_BEGIN',
                blogs_loading: true })
        await blogService.createNewBlog(blogObject, userToken)
            .then(blog => {
                dispatch({
                    type: 'NEW_BLOG',
                    blogs_loading: false,
                    blog: blog
                })
            })
            .catch(error => {
                dispatch({
                    type: 'LOAD_BLOGS_FAILURE',
                    blogs_loading: false,
                    blogs_error: error
                })
                throw new Error(error)
            })
    }
}

export const updateBlog = (blogObject, userToken) => {
    return async (dispatch) => {
        dispatch(
            { type: 'LOAD_BLOGS_BEGIN',
                blogs_loading: true })
        await blogService.updateBlog(blogObject, userToken)
            .then(
                dispatch({
                    type: 'UPDATE_BLOG',
                    blogs_loading: false,
                    blog: blogObject
                })
            )
            .catch(error => {
                dispatch({
                    type: 'LOAD_BLOGS_FAILURE',
                    blogs_loading: false,
                    blogs_error: error
                })
                throw new Error(error)
            })
    }
}

export const deleteBlog = (blogObject, userToken) => {
    return async (dispatch) => {
        dispatch(
            { type: 'LOAD_BLOGS_BEGIN',
                blogs_loading: true })
        await blogService.deleteBlog(blogObject, userToken)
            .then(
                dispatch({
                    type: 'DELETE_BLOG',
                    blogs_loading: false,
                    blog: blogObject
                }))
            .catch(error => {
                dispatch({
                    type: 'LOAD_BLOGS_FAILURE',
                    blogs_loading: false,
                    blogs_error: error
                })
                throw new Error(error)
            })
    }
}

export const commentBlog = (blogObject, userToken) => {
    return async (dispatch) => {
        dispatch(
            { type: 'LOAD_BLOGS_BEGIN',
                blogs_loading: true })
        await blogService.commentBlog(blogObject, userToken)
            .then(
                dispatch({
                    type: 'COMMENT_BLOG',
                    blogs_loading: false,
                    blog: blogObject
                })
            )
            .catch(error => {
                dispatch({
                    type: 'LOAD_BLOGS_FAILURE',
                    blogs_loading: false,
                    blogs_error: error
                })
                throw new Error(error)
            })
    }
}

export default blogReducer