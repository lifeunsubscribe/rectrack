import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DashboardLayout from './DashboardLayout'

describe('DashboardLayout', () => {
  it('renders without crashing', () => {
    render(<DashboardLayout />)
    expect(screen.getByText(/RecTrack/i)).toBeInTheDocument()
  })

  it('shows welcome message when no client is selected', () => {
    render(<DashboardLayout />)
    expect(screen.getByText('Select a client from the sidebar to view details')).toBeInTheDocument()
  })

  it('renders with custom breadcrumb', () => {
    render(<DashboardLayout breadcrumb={['Home', 'Settings', 'Details']} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Details')).toBeInTheDocument()
  })

  it('applies dashboard-layout class', () => {
    const { container } = render(<DashboardLayout />)
    expect(container.querySelector('.dashboard-layout')).toBeInTheDocument()
  })
})
