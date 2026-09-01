import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ATMSearchProvider } from '../../src/features/atm/model/ATMSearchProvider';
import { ATMFilters } from '../../src/features/atm/molecules/ATMFilters';

describe('ATMFilters', () => {
  it('renders the ATM search input', () => {
    render(
      <ATMSearchProvider>
        <ATMFilters />
      </ATMSearchProvider>,
    );
    expect(screen.getByPlaceholderText(/جست‌وجو بر اساس پایانه/)).toBeInTheDocument();
  });
});
