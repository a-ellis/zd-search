// test-utils.js
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '@zendeskgarden/react-theming';

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { wrapper: ThemeProvider, ...options });

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
