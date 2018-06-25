import * as React from 'react';

const Loading: React.SFC<any> = () => (
  <div className={'d-block text-center mt-4'}>
    <i className={'d-block text-center fas fa-3x fa-spinner fa-pulse'} />
    <div className={'mt-3'}>Loading...</div>
  </div>
);
  
export { Loading };
