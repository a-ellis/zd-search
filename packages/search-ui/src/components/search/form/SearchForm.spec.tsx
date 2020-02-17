import React from 'react';
import { cleanup, fireEvent, render, RenderResult, waitForElement } from '../../../utils/test-utils';
import { entityOptions } from './dropdown-option.constants';
import { SearchForm } from './SearchForm';

const getDefaultProps = () => ({
  onSearchEvent: jest.fn()
});

/**
 * Utility for pre-selecting value from entity dropdown
 */
const selectEntityFromDropdown = async (placeholderText: string = 'Select Entity...', optionText: string = 'Users'): Promise<RenderResult> => {
  const originalRender = render(<SearchForm {...getDefaultProps()} />);
  originalRender.getByText(placeholderText).click();
  (await (waitForElement(() => originalRender.getByText(optionText)))).click();

  originalRender.rerender(<SearchForm {...getDefaultProps()} />);

  return originalRender;
};

const selectEntityAndFieldFromDropdown = async (optionText: string = 'ID') => {
  const originalRender = await selectEntityFromDropdown();
  originalRender.getByText('Select Field...').click();
  (await (waitForElement(() => originalRender.getByText(optionText)))).click();

  originalRender.rerender(<SearchForm {...getDefaultProps()} />);

  return originalRender;
}

describe('Search', () => {

  afterEach(() => {
    cleanup();
  });

  it('renders with default props', () => {
    const { baseElement } = render(<SearchForm {...getDefaultProps()} />);

    expect(baseElement).toBeVisible();
  });

  describe('Entity Dropdown', () => {
    const entityPlaceholderText = 'Select Entity...';

    it('renders', () => {
      const { getByText } = render(<SearchForm {...getDefaultProps()} />);

      expect(getByText(entityPlaceholderText)).toBeVisible();
    });

    it('sets entity on selection', async () => {
      const { getByText, rerender } = render(<SearchForm {...getDefaultProps()} />);
      const entitySelectEl = getByText(entityPlaceholderText);

      entitySelectEl.click();

      const userOption = await waitForElement(() => getByText(entityOptions[0].label));

      userOption.click();

      expect(entitySelectEl.textContent).toBe('Users');
    });
  });

  describe('Field Dropdown', () => {
    const fieldPlaceholderText = 'Select Field...';

    it('renders', () => {
      const { baseElement } = render(<SearchForm {...getDefaultProps()} />);

      expect(baseElement).toBeVisible();
    });

    it('is disabled when there is not a selected entity', () => {
      const { getByText } = render(<SearchForm {...getDefaultProps()} />);

      // Dropdown uses custom DOM for creating the Select; key off of the class used to disable it
      expect(getByText(fieldPlaceholderText).getAttribute('class')).toContain('text__is-disabled');
    });

    it('sets field on selection', async () => {
      const { getByText, rerender } = await selectEntityFromDropdown();
      const fieldSelectEl = getByText(fieldPlaceholderText);

      fieldSelectEl.click();

      const idOption = await waitForElement(() => getByText('ID'));

      idOption.click();

      expect(fieldSelectEl.textContent).toBe('ID');
    });
  });

  describe('Matcher Dropdown', () => {
    const matcherPlaceholderText = 'Select Matcher...';

    it('renders', () => {
      const { baseElement } = render(<SearchForm {...getDefaultProps()} />);

      expect(baseElement).toBeVisible();
    });

    it('is disabled when there is no selected entity', () => {
      const { getByText } = render(<SearchForm {...getDefaultProps()} />);

      // Dropdown uses custom DOM for creating the Select; key off of the class used to disable it
      expect(getByText(matcherPlaceholderText).getAttribute('class')).toContain('text__is-disabled');
    });

    it('is disabled when there is a selected entity, but not a selected field', async () => {
      const { getByText } = await selectEntityFromDropdown();

      // Dropdown uses custom DOM for creating the Select; key off of the class used to disable it
      expect(getByText(matcherPlaceholderText).getAttribute('class')).toContain('text__is-disabled');
    });

    it('renders all options when field type does not require exact match', async () => {
      const { getByText, getAllByRole } = await selectEntityAndFieldFromDropdown('Url');
      const matcherSelectEl = getByText('Select Matcher...');

      matcherSelectEl.click();

      const optionElements = await waitForElement(() => getAllByRole('option'));

      expect(optionElements).toHaveLength(3);
    });

    it('filters out "contains" option when field type requires exact match', async () => {
      const { getByText, queryByText } = await selectEntityAndFieldFromDropdown();
      const matcherSelectEl = getByText('Select Matcher...');

      matcherSelectEl.click();

      // Once first option is available, all optoins are available
      const isOption = await waitForElement(() => getByText('Is'));

      const isEmptyOption = getByText('Is Empty');

      // use queryBy as option is expected to be filtered out
      const containsOption = queryByText('Contains');

      expect(isOption).toBeVisible();
      expect(isEmptyOption).toBeVisible();
      expect(containsOption).toBeNull();
    });

    it('sets selectedMatcher to undefined if current value was "contains" on exact match field type', async () => {
      const { getByText, queryByText } = await selectEntityAndFieldFromDropdown('Url');
      const matcherSelectEl = getByText('Select Matcher...');

      matcherSelectEl.click();

      const containsOption = await waitForElement(() => getByText('Contains'));

      containsOption.click();

      getByText('Url').click();
      (await waitForElement(() => getByText('ID'))).click();

      expect(queryByText('Contains')).toBeNull();
    });

    // it('clears current state.value if "is_empty" matcher is selected', async () => {
    //   const { getByText, getByLabelText, rerender } = await selectEntityAndFieldFromDropdown('Url');
    //   const inputEl = getByLabelText('Value');
    //   const matcherSelectEl = getByText('Select Matcher...');

    //   const waitForselectContains = async () => {
    //     matcherSelectEl.click();
    //     let containsOption = await waitForElement(() => getByText('Contains'));
    //     containsOption.click();
    //     await wait(() => {
    //       expect(containsOption).not.toBeInTheDocument();
    //     });
    //   }

    //   const waitForSelectIsEmpty = async () => {
    //     matcherSelectEl.click();
    //     const emptyOption = await waitForElement(() => getByText('Is Empty'));
    //     emptyOption.click();
    //     await wait(() => {
    //       expect(emptyOption).not.toBeInTheDocument();
    //     });
    //   }

    //   await waitForselectContains();

    //   fireEvent.change(inputEl, { target: { value: 'test.com' } });

    //   await waitForSelectIsEmpty();
    //   await waitForselectContains()

    //   // rerender(<SearchForm {...getDefaultProps()} />);
    //   // fireEvent.change(inputEl, { target: { value: '' } });

    //   expect(inputEl).toHaveValue('');
    // });
  });

  describe('Search Value Input', () => {
    it('renders disabled by default', () => {
      const { baseElement } = render(<SearchForm {...getDefaultProps()} />);

      expect(baseElement).toBeVisible();
    });

    it('sets input value on change', () => {
      const { getByLabelText } = render(<SearchForm {...getDefaultProps()} />);
      const inputEl = getByLabelText('Value');

      expect(inputEl).toHaveValue('');

      fireEvent.change(inputEl, { target: { value: 'test'} });

      expect(inputEl).toHaveValue('test');
    });
  });
});
