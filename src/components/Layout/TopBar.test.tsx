import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TopBar from './TopBar'

describe('TopBar', () => {
  it('renders without crashing', () => {
    render(<TopBar />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renders default breadcrumb when none provided', () => {
    render(<TopBar />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renders custom breadcrumb', () => {
    render(<TopBar breadcrumb={['Home', 'Clients', 'Details']} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Clients')).toBeInTheDocument()
    expect(screen.getByText('Details')).toBeInTheDocument()
  })

  it('renders breadcrumb navigation with correct aria-label', () => {
    render(<TopBar />)
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
  })

  it('applies correct CSS class', () => {
    const { container } = render(<TopBar />)
    expect(container.querySelector('.dashboard-layout__topbar')).toBeInTheDocument()
  })
})
