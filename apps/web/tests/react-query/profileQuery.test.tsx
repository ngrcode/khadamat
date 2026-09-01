import { useQuery } from '@tanstack/react-query';
import { describe, expect, it } from 'vitest';

import { renderWithQueryClient, screen } from '../utils/test-utils';

type Profile = {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
};

const fetchProfile = async (): Promise<Profile> => {
  const response = await fetch('http://localhost/api/profile');

  if (!response.ok) {
    throw new Error('Failed to load profile');
  }

  return response.json();
};

const ProfilePanel = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <section aria-label="profile">
      <h1>{`${data?.firstName} ${data?.lastName}`}</h1>
      <p>{data?.role}</p>
    </section>
  );
};

describe('profile query', () => {
  it('loads profile data through MSW', async () => {
    renderWithQueryClient(<ProfilePanel />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('سارا احمدی')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
  });
});
