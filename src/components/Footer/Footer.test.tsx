import { render, screen } from '@testing-library/react';
import React from 'react';
import { Footer } from './Footer';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Footer component', () => {
  const { location } = window;
  beforeAll(() => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = { href: '' };
  });

  afterAll((): void => {
    window.location = location;
  });
  it('should render copyright', () => {
    render(<Footer />);
    const element = screen.getByText('Agile Scrum');
    expect(element).toBeInTheDocument();
  });
  it('should render Product', () => {
    render(<Footer />);
    const element = screen.getByText('Product');
    expect(element).toBeInTheDocument();
  });
  it('should render Connect', () => {
    render(<Footer />);
    const element = screen.getByText('Connect');
    expect(element).toBeInTheDocument();
  });
  it('should render Legal', () => {
    render(<Footer />);
    const element = screen.getByText('Legal');
    expect(element).toBeInTheDocument();
  });
  it('should show link to submit issue', () => {
    render(<Footer />);
    const element = screen.getByText('Submit an Issue');
    expect(element).toBeInTheDocument();
  });
});
