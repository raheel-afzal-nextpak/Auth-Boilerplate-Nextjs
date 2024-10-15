import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { StepperItem } from '../../src/components/form-collection/StepperItem'

describe('StepperItem Component', () => {
    test('should render without crashing', () => {
        const onSelectMock = jest.fn()

        const { container } = render(
            <StepperItem
                step={0}
                onSelect={onSelectMock}
                selectedIndex={1}
                isCompleted={false}
            >
                Step Content
            </StepperItem>,
        )

        // Assert that something is rendered
        expect(container).toBeTruthy()
    })
})
