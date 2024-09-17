import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom'; // for extended matchers
import { LanguageControl } from './LanguageControl';

describe('LanguageControl component', () => {
  test('should render with default language', async () => {
    render(<LanguageControl />);

    const wrapperNode = screen.getByTestId('language-control');
    const button = await within(wrapperNode).findByRole('button');

    expect(button).toHaveTextContent('English (US)');
  });

  test('should changes language when selecting a flag option', async () => {
    render(<LanguageControl />);

    const wrapperNode = screen.getByTestId('language-control');
    const button = await within(wrapperNode).findByRole('button');

    fireEvent.mouseDown(button);

    const option = await screen.findByText('Portuguese (BR)');

    fireEvent.click(option);

    expect(button).toHaveTextContent('Portuguese (BR)');
  });
});
