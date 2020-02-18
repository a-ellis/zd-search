import React from 'react';
import { fireEvent, render, wait, waitForElement } from '../../../utils/test-utils';
import { SearchEvent } from '../interfaces/search.interface';
import { entityOptions } from './dropdown-option.constants';
import { SearchForm } from './SearchForm';

const getDefaultProps = (props?: { onSearchEvent: (e: SearchEvent) => void }) => ({
  onSearchEvent: jest.fn(),
  ...props
});

describe('SearchForm', () => {
  const ENTITY_PLACEHOLDER = 'Select Entity...';
  const FIELD_PLACEHOLDER = 'Select Field...';
  const MATCHER_PLACEHOLDER = 'Select Matcher...';
  const VALUE_LABEL = 'Value';

  it('renders with default props', () => {
    const { baseElement } = render(<SearchForm {...getDefaultProps()} />);

    expect(baseElement).toBeVisible();
  });

  describe('Entity Dropdown', () => {
    it('renders', () => {
      const { getByText } = render(<SearchForm {...getDefaultProps()} />);

      expect(getByText(ENTITY_PLACEHOLDER)).toBeVisible();
    });

    it('sets entity on selection', async () => {
      const { getByText } = render(<SearchForm {...getDefaultProps()} />);
      const entitySelectEl = getByText(ENTITY_PLACEHOLDER);

      entitySelectEl.click();

      const userOption = await waitForElement(() => getByText(entityOptions[0].label));

      userOption.click();

      expect(entitySelectEl.textContent).toBe('Users');
    });
  });

  describe('Field Dropdown', () => {
    it('renders', () => {
      const { baseElement } = render(<SearchForm {...getDefaultProps()} />);

      expect(baseElement).toBeVisible();
    });

    it('is disabled when there is not a selected entity', () => {
      const { getByText } = render(<SearchForm {...getDefaultProps()} />);

      // Dropdown uses custom DOM for creating the Select; key off of the class used to disable it
      expect(getByText(FIELD_PLACEHOLDER).getAttribute('class')).toContain('text__is-disabled');
    });

    it('sets field on selection', async () => {
      const { getByText } = render(<SearchForm {...getDefaultProps()} />);

      getByText(ENTITY_PLACEHOLDER).click();
      (await waitForElement(() => getByText('Users'))).click();

      const fieldSelectEl = getByText(FIELD_PLACEHOLDER);
      fieldSelectEl.click();
      (await waitForElement(() => getByText('ID'))).click();

      expect(fieldSelectEl.textContent).toBe('ID');
    });
  });

  describe('Matcher Dropdown', () => {
    it('renders', () => {
      const { baseElement } = render(<SearchForm {...getDefaultProps()} />);

      expect(baseElement).toBeVisible();
    });

    it('is disabled when there is no selected entity', () => {
      const { getByText } = render(<SearchForm {...getDefaultProps()} />);

      // Dropdown uses custom DOM for creating the Select; key off of the class used to disable it
      expect(getByText(MATCHER_PLACEHOLDER).getAttribute('class')).toContain('text__is-disabled');
    });

    it('is disabled when there is a selected entity, but not a selected field', async () => {
      const { getByText } = render(<SearchForm {...getDefaultProps()} />);

      getByText(ENTITY_PLACEHOLDER).click();
      (await waitForElement(() => getByText('Users'))).click();

      // Dropdown uses custom DOM for creating the Select; key off of the class used to disable it
      expect(getByText(MATCHER_PLACEHOLDER).getAttribute('class')).toContain('text__is-disabled');
    });

    it('renders all options when field type does not require exact match', async () => {
      const { getByText } = render(<SearchForm {...getDefaultProps()} />);

      getByText(ENTITY_PLACEHOLDER).click();
      (await waitForElement(() => getByText('Users'))).click();

      getByText(FIELD_PLACEHOLDER).click();
      (await waitForElement(() => getByText('Url'))).click();

      getByText(MATCHER_PLACEHOLDER).click();

      await wait(() => {
        expect(getByText('Is')).toBeVisible();
        expect(getByText('Is Empty')).toBeVisible();
        expect(getByText('Contains')).toBeVisible();
      });
    });

    it('filters out "contains" option when field type requires exact match', async () => {
      const { getByText, queryByText } = render(<SearchForm {...getDefaultProps()} />);

      getByText(ENTITY_PLACEHOLDER).click();
      (await waitForElement(() => getByText('Users'))).click();

      getByText(FIELD_PLACEHOLDER).click();
      (await waitForElement(() => getByText('ID'))).click();

      getByText(MATCHER_PLACEHOLDER).click();

      await wait(() => {
        expect(getByText('Is')).toBeVisible();
        expect(getByText('Is Empty')).toBeVisible();
        //use queryBy as option is expected to be filtered out
        expect(queryByText('Contains')).toBeNull();
      });
    });

    it('sets selectedMatcher to undefined if current value was "contains" on exact match field type', async () => {
      const { getByText, queryByText } = render(<SearchForm {...getDefaultProps()} />);

      getByText(ENTITY_PLACEHOLDER).click();
      (await waitForElement(() => getByText('Users'))).click();

      getByText(FIELD_PLACEHOLDER).click();
      (await waitForElement(() => getByText('Url'))).click();

      getByText(MATCHER_PLACEHOLDER).click();
      (await waitForElement(() => getByText('Contains'))).click();

      getByText('Url').click();
      (await waitForElement(() => getByText('ID'))).click();

      expect(queryByText('Contains')).toBeNull();
    });
  });

  describe('Search Value Input', () => {
    it('renders disabled by default', () => {
      const { baseElement } = render(<SearchForm {...getDefaultProps()} />);

      expect(baseElement).toBeVisible();
    });

    it('sets input value on change', () => {
      const { getByLabelText } = render(<SearchForm {...getDefaultProps()} />);
      const inputEl = getByLabelText(VALUE_LABEL);

      expect(inputEl).toHaveValue('');

      fireEvent.change(inputEl, { target: { value: 'test'} });

      expect(inputEl).toHaveValue('test');
    });

    describe('with selected entity, field, and matcher', () => {
      it('emits search event on change', async () => {
        const mockOnSearchEventHandler = jest.fn();
        const { getByText, getByLabelText } = render(<SearchForm {...getDefaultProps()} onSearchEvent={mockOnSearchEventHandler} />);

        getByText(ENTITY_PLACEHOLDER).click();
        (await waitForElement(() => getByText('Users'))).click();

        getByText(FIELD_PLACEHOLDER).click();
        (await waitForElement(() => getByText('ID'))).click();

        getByText(MATCHER_PLACEHOLDER).click();
        (await waitForElement(() => getByText('Is'))).click();

        fireEvent.change(getByLabelText(VALUE_LABEL), { target: { value: 'new value'} });

        expect(mockOnSearchEventHandler).toHaveBeenCalled();
      });

      it('emits search event on ENTER keydown', async () => {
        const mockOnSearchEventHandler = jest.fn();
        const { getByText, getByLabelText } = render(<SearchForm {...getDefaultProps()} onSearchEvent={mockOnSearchEventHandler} />);

        getByText(ENTITY_PLACEHOLDER).click();
        (await waitForElement(() => getByText('Users'))).click();

        getByText(FIELD_PLACEHOLDER).click();
        (await waitForElement(() => getByText('Name'))).click();

        getByText(MATCHER_PLACEHOLDER).click();
        (await waitForElement(() => getByText('Contains'))).click();

        getByLabelText(VALUE_LABEL).focus();
        fireEvent.keyDown(document.activeElement || document.body, { keyCode: 13 });

        expect(mockOnSearchEventHandler).toHaveBeenCalled();
      });
    });
  });

  describe('Search Button', () => {
    it('renders when matcher is "is_empty"', async () => {
      const { getByText, queryByText } = render(<SearchForm {...getDefaultProps()} />);

      getByText(ENTITY_PLACEHOLDER).click();
      (await waitForElement(() => getByText('Users'))).click();

      getByText(FIELD_PLACEHOLDER).click();
      (await waitForElement(() => getByText('ID'))).click();

      getByText(MATCHER_PLACEHOLDER).click();
      (await waitForElement(() => getByText('Is Empty'))).click();

      expect(queryByText('Search')).toBeVisible();
    });

    it('emits search event on click', async () => {
      const mockOnSearchEventHandler = jest.fn();
      const { getByText } = render(<SearchForm {...getDefaultProps()} onSearchEvent={mockOnSearchEventHandler} />);

      getByText(ENTITY_PLACEHOLDER).click();
      (await waitForElement(() => getByText('Users'))).click();

      getByText(FIELD_PLACEHOLDER).click();
      (await waitForElement(() => getByText('ID'))).click();

      getByText(MATCHER_PLACEHOLDER).click();
      (await waitForElement(() => getByText('Is Empty'))).click();

      getByText('Search').click();

      expect(mockOnSearchEventHandler).toHaveBeenCalled();
    });
  });
});
