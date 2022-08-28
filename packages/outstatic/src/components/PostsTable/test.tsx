import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '../../utils/TestWrapper'
import PostsTable from '.'

const posts = [
  {
    title: 'A beautiful day',
    publishedAt: new Date('2022-02-02'),
    status: 'published' as const,
    slug: 'a-beautiful-day'
  }
]

describe('<PostsTable />', () => {
  it('should render the heading', () => {
    render(
      <TestWrapper>
        <PostsTable posts={posts} contentType="posts" />
      </TestWrapper>
    )

    expect(screen.getByRole('row', { name: /Beautiful/i })).toBeInTheDocument()
  })
})
