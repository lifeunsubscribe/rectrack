import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Sidebar from './Sidebar'

describe('Sidebar', () => {
  it('renders without crashing', () => {
    render(<Sidebar />)
    expect(screen.getByText('Clients')).toBeInTheDocument()
  })

  it('shows full text when not collapsed', () => {
    render(<Sidebar isCollapsed={false} />)
    expect(screen.getByText('Clients')).toBeInTheDocument()
    expect(screen.getByText('Client list will appear here')).toBeInTheDocument()
  })

  it('shows abbreviated text when collapsed', () => {
    render(<Sidebar isCollapsed={true} />)
    expect(screen.getByText('C')).toBeInTheDocument()
    expect(screen.queryByText('Client list will appear here')).not.toBeInTheDocument()
  })

  it('applies correct CSS class', () => {
    const { container } = render(<Sidebar />)
    expect(container.querySelector('.dashboard-layout__sidebar')).toBeInTheDocument()
  })
})
