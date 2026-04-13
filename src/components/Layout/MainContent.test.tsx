import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MainContent from './MainContent'

describe('MainContent', () => {
  it('renders without crashing', () => {
    render(<MainContent />)
    expect(screen.getByText(/Welcome to RecTrack/i)).toBeInTheDocument()
  })

  it('renders default placeholder content when no children provided', () => {
    render(<MainContent />)
    expect(screen.getByText(/Welcome to RecTrack/i)).toBeInTheDocument()
    expect(screen.getByText(/CPA Reconciliation Workflow Tracker/i)).toBeInTheDocument()
  })

  it('renders custom children when provided', () => {
    render(
      <MainContent>
        <div>Custom main content</div>
      </MainContent>
    )
    expect(screen.getByText('Custom main content')).toBeInTheDocument()
    expect(screen.queryByText(/Welcome to RecTrack/i)).not.toBeInTheDocument()
  })

  it('applies correct CSS class', () => {
    const { container } = render(<MainContent />)
    expect(container.querySelector('.dashboard-layout__main')).toBeInTheDocument()
  })
})
