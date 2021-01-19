import 'jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import React from 'react'
import { render, fireEvent } from "@testing-library/react"
import SimpleBlog from './SimpleBlog'


const blog = {
    title: 'TITLE',
    author: 'Lana',
    likes: 12,
}

test("renders content", () => {

    const component = render(<SimpleBlog blog={blog} />)
    expect(component.container).toHaveTextContent("TITLE")
    expect(component.container).toHaveTextContent("Lana")
    expect(component.container).toHaveTextContent('blog has 12 likes')
})


test("clicking likes button twice calls event handler twice", () => {
    const mockHandler = jest.fn()
    const { getByText } = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    )
    const button = getByText("like")
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
})