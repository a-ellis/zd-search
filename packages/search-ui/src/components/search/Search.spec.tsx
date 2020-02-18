import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { fireEvent, render, wait, waitForElement } from '../../utils/test-utils';
import { Search } from './Search';

jest.mock('axios');

describe('Search', () => {
  let axiosMock: jest.Mocked<typeof axios>;
  const ENTITY_PLACEHOLDER = 'Select Entity...';
  const FIELD_PLACEHOLDER = 'Select Field...';
  const MATCHER_PLACEHOLDER = 'Select Matcher...';
  const VALUE_LABEL = 'Value';

  beforeEach(() => {
    axiosMock = axios as jest.Mocked<typeof axios>;
  });

  it('should render', () => {
    const { baseElement } = render(<Search />);
    expect(baseElement).toBeVisible();
  });

  it('should call to get search results with expected args', async () => {
    const mockAxiosResponse: AxiosResponse = {
      data: [
        { _id: 1, name: 'Joe Johnson', alias: 'Joe' }
      ],
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {}
    };

    axiosMock.get.mockResolvedValueOnce(mockAxiosResponse);
    const { getByText, getByLabelText } = render(<Search />);

    getByText(ENTITY_PLACEHOLDER).click();
    (await waitForElement(() => getByText('Users'))).click();

    getByText(FIELD_PLACEHOLDER).click();
    (await waitForElement(() => getByText('Name'))).click();

    getByText(MATCHER_PLACEHOLDER).click();
    (await waitForElement(() => getByText('Contains'))).click();

    fireEvent.change(getByLabelText(VALUE_LABEL), { target: { value: 'son'} });

    await wait(() => {
      expect(axiosMock.get).toHaveBeenCalledWith('/users/search', {
        params: {
          field: 'name',
          value: 'son',
          exact: false
        }
      });
    });
  });

  it('should debounce search events', async () => {
    const { getByText, getByLabelText } = render(<Search />);

    getByText(ENTITY_PLACEHOLDER).click();
    (await waitForElement(() => getByText('Users'))).click();

    getByText(FIELD_PLACEHOLDER).click();
    (await waitForElement(() => getByText('Name'))).click();

    getByText(MATCHER_PLACEHOLDER).click();
    (await waitForElement(() => getByText('Contains'))).click();

    // firing change event in immediate succession
    fireEvent.change(getByLabelText(VALUE_LABEL), { target: { value: 'J'} });
    fireEvent.change(getByLabelText(VALUE_LABEL), { target: { value: 'Jo'} });
    fireEvent.change(getByLabelText(VALUE_LABEL), { target: { value: 'Joh'} });
    fireEvent.change(getByLabelText(VALUE_LABEL), { target: { value: 'John'} });

    await wait(() => {
      expect(axiosMock.get).toHaveBeenCalledTimes(1);
    });
  });

  it('should catch errors from search call',async () => {
    const mockError = {
      statusCode: 400,
      error: "Bad Request"
    };
    // suppress the console error
    jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    axiosMock.get.mockRejectedValueOnce(mockError);

    const { getByText, getByLabelText } = render(<Search />);

    getByText(ENTITY_PLACEHOLDER).click();
    (await waitForElement(() => getByText('Users'))).click();

    getByText(FIELD_PLACEHOLDER).click();
    (await waitForElement(() => getByText('Name'))).click();

    getByText(MATCHER_PLACEHOLDER).click();
    (await waitForElement(() => getByText('Contains'))).click();

    fireEvent.change(getByLabelText(VALUE_LABEL), { target: { value: 'son'} });

    await wait(() => {
      expect(console.error).toHaveBeenCalledWith(mockError);
    });
  });
});
