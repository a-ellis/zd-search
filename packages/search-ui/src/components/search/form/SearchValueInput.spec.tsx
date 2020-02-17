import React from 'react';
import { DropdownOption } from '../interfaces/search.interface';
import { SearchValueInput } from './SearchValueInput';
import { render } from '../../../utils/test-utils';

const getDefaultProps = () => ({
  onValueChange: jest.fn(),
  onInputKeyDown: jest.fn(),
  onSearchButtonClick: jest.fn(),
});

describe('SearchValueInput', () => {
  it('renders with default props', () => {
    const { baseElement } = render(<SearchValueInput {...getDefaultProps()} />);

    expect(baseElement).toBeVisible();
  });

  describe('Input', () => {
    const inputPlaceholderText = 'Enter search value...';
    const mockEntity: DropdownOption = {
      label: 'Users',
      value: 'users'
    };
    const mockField: DropdownOption = {
      label: 'Name',
      value: 'name',
      type: 'string'
    };
    const mockMatcher: DropdownOption = {
      label: 'Contains',
      value: 'contains'
    };

    it('renders by default', () => {
      const { getByPlaceholderText } = render(<SearchValueInput {...getDefaultProps()} />);

      expect(getByPlaceholderText(inputPlaceholderText)).toBeVisible();
    });

    it('renders when field.type is not "boolean"', () => {
      const { getByPlaceholderText } = render(<SearchValueInput {...getDefaultProps()} field={mockField} />);

      expect(getByPlaceholderText(inputPlaceholderText)).toBeVisible();
    });

    it('renders when matcher value is not "is_empty"', () => {
      const { getByPlaceholderText } = render(<SearchValueInput {...getDefaultProps()} matcher={mockMatcher} />);

      expect(getByPlaceholderText(inputPlaceholderText)).toBeVisible();
    });

    it('is disabled when there is no entity', () => {
      const { getByPlaceholderText } = render(<SearchValueInput {...getDefaultProps()} entity={undefined} />);

      expect(getByPlaceholderText(inputPlaceholderText)).toBeDisabled();
    });

    it('is disabled when there is an entity, but no field', () => {
      const { getByPlaceholderText } = render(<SearchValueInput {...getDefaultProps()} entity={mockEntity} field={undefined} />);

      expect(getByPlaceholderText(inputPlaceholderText)).toBeDisabled();
    });

    it('is disabled when there is an entity and field, but no matcher', () => {
      const { getByPlaceholderText } = render(<SearchValueInput {...getDefaultProps()} entity={mockEntity} field={mockField} matcher={undefined} />);

      expect(getByPlaceholderText(inputPlaceholderText)).toBeDisabled();
    });
  });

  describe('Radio', () => {
    const trueLabelText = 'True';
    const falseLabelText = 'False';

    it('renders for "true" and "false" when field type is "boolean"', () => {
      const mockField: DropdownOption = {
        label: 'Active',
        value: 'active',
        type: 'boolean'
      };
      const { getByLabelText } = render(<SearchValueInput {...getDefaultProps()} field={mockField} />);
      const radioTrue = getByLabelText(trueLabelText);
      const radioFalse = getByLabelText(falseLabelText);

      expect(radioTrue).toBeVisible();
      expect(radioFalse).toBeVisible();
    });


    it('does not render when field type is not "boolean"', () => {
      const mockField: DropdownOption = {
        label: 'Name',
        value: 'name',
        type: 'string'
      };
      const { queryByLabelText } = render(<SearchValueInput {...getDefaultProps()} field={mockField} />);

      expect(queryByLabelText(trueLabelText)).toBeNull();
      expect(queryByLabelText(falseLabelText)).toBeNull();
    });
  });

  describe('Button', () => {
    const buttonText = 'Search';
    const mockEntity: DropdownOption = {
      label: 'Users',
      value: 'users'
    };
    const mockField: DropdownOption = {
      label: 'Name',
      value: 'name',
      type: 'string'
    };
    const mockMatcher: DropdownOption = {
      label: 'Is Empty',
      value: 'is_empty'
    };

    it('renders when field type is not "boolean" and matcher value is "is_empty"', () => {
      const { getByText } = render(<SearchValueInput {...getDefaultProps()} matcher={mockMatcher} />);

      expect(getByText(buttonText)).toBeVisible();
    });

    it('is disabled when there is no entity', () => {
      const { getByText } = render(<SearchValueInput {...getDefaultProps()} matcher={mockMatcher} />);

      expect(getByText(buttonText)).toBeDisabled();
    });

    it('is disabled when there is an entity, but no field', () => {
      const { getByText } = render(<SearchValueInput {...getDefaultProps()} matcher={mockMatcher} entity={mockEntity} />);

      expect(getByText(buttonText)).toBeDisabled();
    });
  });
});
