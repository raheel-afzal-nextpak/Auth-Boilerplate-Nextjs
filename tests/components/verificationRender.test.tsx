import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Verification } from '../../src/components/form-collection/Verification';

describe('Verification Component', () => {
  test('should render without crashing', () => {
    const onPrevMock = jest.fn();

    const { container } = render(
      <Verification onPrev={onPrevMock}>
        <div>Children content</div>
      </Verification>
    );

    // Assert that something is rendered
    expect(container).toBeTruthy();
  });
});
