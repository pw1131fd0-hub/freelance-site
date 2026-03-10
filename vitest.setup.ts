import '@testing-library/jest-dom';
import * as React from 'react';

// Polyfill for React 19 act missing in react-dom/test-utils
const globalAny: any = global;
globalAny.IS_REACT_ACT_ENVIRONMENT = true;

// Override missing act from test-utils
if (typeof React.act !== 'function') {
  console.warn('React.act is missing, this might cause issues with tests');
} else {
  // @testing-library/react attempts to call act from react-dom/test-utils in some versions
  // we will try to make sure global.React has act.
}