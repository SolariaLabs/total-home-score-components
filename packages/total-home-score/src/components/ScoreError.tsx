import * as React from 'react';

const ScoreError: React.SFC<any> = () => (
  <div className={'d-block text-center mt-3 mb-5'}>
    <i className={'m-2 fas fa-3x fa-exclamation-triangle'} />
    <div>These scores are temporarily unavailable. Please check back soon.</div>
  </div>
);
  
export { ScoreError };
