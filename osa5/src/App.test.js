import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App/>', () => {
    let app
    beforeAll(() => {
        app = mount(<App />)
    })
    
    it('blogs are not visible before logging in', () => {
        app.update()
        const title = app.find('h2')
        expect(title.text()).toContain("Log in to application")
    })
    
})
        