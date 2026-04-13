import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MainContent from './MainContent'

describe('MainContent', () => {
  it('renders without crashing', () => {
    render(<MainContent selectedClientId={null} />)
    expect(screen.getByText(/Welcome to RecTrack/i)).toBeInTheDocument()
  })

  it('renders welcome message when no client is selected', () => {
    render(<MainContent selectedClientId={null} />)
    expect(screen.getByText(/Welcome to RecTrack/i)).toBeInTheDocument()
    expect(screen.getByText(/CPA Reconciliation Workflow Tracker/i)).toBeInTheDocument()
    expect(screen.getByText('Select a client from the sidebar to view details')).toBeInTheDocument()
  })

  it('renders ClientDetail when a client is selected', () => {
    render(<MainContent selectedClientId="client-001" />)
    expect(screen.getByText('Greenfield Consulting LLC')).toBeInTheDocument()
  })

  it('applies correct CSS class', () => {
    const { container } = render(<MainContent selectedClientId={null} />)
    expect(container.querySelector('.dashboard-layout__main')).toBeInTheDocument()
  })
})
