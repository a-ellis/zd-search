import React from 'react';
import { UserTableContent } from './UserTableContent';
import { render } from '../../../utils/test-utils';
import { User } from '../interfaces/user.interface';

describe('UserTableContent', () => {
  it('renders', () => {
    const { baseElement } = render(<UserTableContent />);

    expect(baseElement).toBeVisible();
  });

  it('renders a Tag for role', () => {
    const mockUsers = [
      { _id: 1, name: 'user 1', role: 'admin' }
    ] as unknown as User[];

    const { getByText } = render(<UserTableContent users={mockUsers} />);

    expect(getByText('admin')).toBeVisible();
    expect(getByText('admin').getAttribute('data-garden-id')).toContain('tag');
  });

  it('replaces hyphen with space for "end-user" role Tag', () => {
    const mockUsers = [
      { _id: 1, name: 'user 1', role: 'end-user' }
    ] as unknown as User[];

    const { getByText } = render(<UserTableContent users={mockUsers} />);

    expect(getByText('end user')).toBeVisible();
    expect(getByText('end user').getAttribute('data-garden-id')).toContain('tag');
  });
});
