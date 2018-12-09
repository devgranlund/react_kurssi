import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    it('renders blog title, author and likes', () => {
        const blog = {
            title: 'Blog title text',
            author: 'Blog author name',
            likes: 3
        }

        const onClick = () => {
            // TODO
        }

        const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={onClick}/>)
        const headerDiv = simpleBlogComponent.find('.header')
        const likesDiv = simpleBlogComponent.find('.likes')

        expect(headerDiv.text()).toContain(blog.title + ' ' + blog.author)
        expect(likesDiv.text()).toContain(blog.likes)
    })

    it('like button works as spefified', () => {
        const blog = {
            title: 'Blog title text',
            author: 'Blog author name',
            likes: 3
        }

        const mockHandler = jest.fn()

        const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)

        const button = simpleBlogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)
    })
})
