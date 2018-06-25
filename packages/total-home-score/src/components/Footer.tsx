import * as React from 'react';

import { ThumbsUp } from '../svgs/ThumbsUp';
import { ThumbsDown } from '../svgs/ThumbsDown';

export interface FooterProps {
  feedback: Function;
  thumbsUp: string;
  thumbsDown: string;
}

const Footer: React.SFC<FooterProps> = ({ feedback, thumbsUp, thumbsDown }) => (
  <div className={'total-home-score-footer'}>
    Are these scores helpful to you?
    <div onClick={() => feedback(true)}>
      <ThumbsUp className={thumbsUp} />
    </div>
    <div onClick={() => feedback(false)}>
      <ThumbsDown className={thumbsDown} />
    </div>
  </div>
);

export { Footer };
