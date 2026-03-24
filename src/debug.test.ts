import * as React from 'react';

describe('React Version Check', () => {
  it('should have act function', () => {
    console.log('React version:', React.version);
    console.log('React keys:', Object.keys(React));
    // removed ts-ignore as it's not needed
    console.log('React.act:', typeof React.act);
  });
});
