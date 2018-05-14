import * as React from 'react';

const Loading: React.SFC<any> = () => (
  <div className={'d-block text-center mt-3 mb-5'}>
    <i className={'d-block text-center fas fa-3x fa-spinner fa-pulse'}/>
    <div>Loading...</div>
  </div>
);
  
export { Loading };
