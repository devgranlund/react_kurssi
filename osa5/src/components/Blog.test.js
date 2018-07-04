import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
    it('after clicking name the details are displayed', () => {
        const blog = {
            title: 'Assassination of Jesse James',
            author: 'Kit Carlson',
            url: 'www.kitcarlson',
            likes: 3
        }
        
        const blogComponent = shallow(<Blog blog={blog}/>)
        
        const headerDiv = blogComponent.find('.blogStyle')
        const notFoundDiv = blogComponent.find('.blogInnerStyle')
        expect(notFoundDiv.getElement().props.style).toEqual({ display: 'none' })
        
        headerDiv.simulate('click')
        const innerDiv = blogComponent.find('.blogInnerStyle')
        expect(innerDiv.getElement().props.style).toEqual({ display: ''})
        
    })
})