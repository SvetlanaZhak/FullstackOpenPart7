import 'jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import { render, fireEvent } from "@testing-library/react"
import React from 'react'
import Blog from "./Blog"

const blog = {
    title: 'TITLE',
    author: 'Lana',
    url: 'http://url.com',
    likes: 0,
    user: { username: 'lana' }
}

describe("Togglable blog info", () => {
    let component
    beforeEach(() => {
        const onDeleteBlog = jest.fn()
        const setBlogs = jest.fn()
        component = render(
            <Blog blog={blog} onDeleteBlog={onDeleteBlog} setBlogs={setBlogs} user={blog.user} />
        )
    })

    test("title and author shown as default", () => {
        expect(component.container).toHaveTextContent(
            'TITLE by Lana'
        )
    })

    test("not to show url and likes by default", () => {
        const div = component.container.querySelector('.BlogContent')
        expect(div).toHaveStyle('display: none')
    })

    test("url and likes shown after click", () => {
        const title = component.getByText('TITLE by Lana')
        fireEvent.click(title)

        const div = component.container.querySelector('.BlogContent')
        expect(div).not.toHaveStyle('display: none')
    })

})