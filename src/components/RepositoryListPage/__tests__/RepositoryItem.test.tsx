import { render } from '@testing-library/react';
import React from 'react';
import RepositoryItem from '../RepositoryItem';

describe('RepositoryItem', () => {
  const defaultProps = {
    name: 'react',
    language: 'javascript',
    description: 'yoooo',
    stargazersCount: 100000,
  };

  const createWrapperRenderer = (testProps = {}) => {
    const props = {
      ...defaultProps,
      ...testProps,
    };

    return render(<RepositoryItem {...props} />);
  };

  it('should render Card', () => {
    const { getByText } = createWrapperRenderer();

    const title = getByText('react');

    expect(title).not.toBeNull();
  });
});
