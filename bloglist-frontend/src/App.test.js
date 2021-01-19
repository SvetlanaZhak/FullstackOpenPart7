import './setupTests'

import React from 'react'
import {
    render, waitForElement
} from '@testing-library/react'

jest.mock('./services/blogs')
import App from './App'

const user = {
    _id: '5a437a9e514ab7f168ddf138',
    username: 'lanita',
    token: '1231231214',
    name: 'Lana Diva'
}

describe('<App />', () => {
    test('if no user logged, blogs are not rendered', async () => {
        const component = render(<App />)
        component.rerender(<App />)
        await waitForElement(() => component.container.querySelector('.Login'))
        try {
            component.getByText('HTML is easy')
        } catch (e) {
            return;
        }
        throw Error();
    })

    test('blogs are shown when user is logged in', async () => {
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        const component = render(
            <App />
        )
        component.rerender(<App />)
        await waitForElement(
            () => component.container.querySelector('.Login')
        )
        const blogs = component.container.querySelectorAll('.Blog')
        expect(blogs.length).toBe(3)
        expect(component.container).toHaveTextContent(
            'HTML is easy'
        )
        expect(component.container).toHaveTextContent(
            'Browser can execute only javascript'
        )
        expect(component.container).toHaveTextContent(
            'The most important methods of HTTP are GET and POST'
        )

    })
})