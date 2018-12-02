import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App/>', () => {
    let app
    
    describe('when user is not logged in', () => {
        beforeEach(() => {
            app = mount(<App />)
        })
        
        it('blogs are not visible before logging in', () => {
            app.update()
            const title = app.find('h2')
            expect(title.text()).toContain("Log in to application")
        })
    })

    describe('when user is logged in', () => {
        beforeEach(() => {
            const user = {
                username: 'tester',
                token: '1231231214',
                name: 'Teuvo Testaaja'
            }
            localStorage.setItem('authorizedUser', JSON.stringify(user))
            app = mount(<App />)
        })
        
        it('blogs are visible when user is logged in', () => {
            app.update()
            const title = app.find('h2')
            expect(title.text()).toContain("blogs")

        })

    })
    
})
        