import { sendEvent } from '../api';
import { getUser, isDebugEnabled } from '../utils';
import { Event } from '../types';

export const track = (name: string, event: Event = {}, store: boolean = false) => {
  if (store) {
    if (localStorage.getItem(`ths_widget.tracking.${name}`)) {
      if (isDebugEnabled()) {
        console.log(`Skipping event [${name}]. Event previously sent.`);
      }
      return Promise.resolve();
    }
    localStorage.setItem(`ths_widget.tracking.${name}`, 'true');
  }

  if (isDebugEnabled()) {
    console.log(`Event: [${JSON.stringify({ name, ...event, user: getUser() })}]`);
    return Promise.resolve();
  }
  
  return sendEvent([{ name, ...event, user: getUser() }])
    .then(response => response.text())
    .then((text: string) => {
      if (isDebugEnabled()) {
        console.log(`Event [${name}] sent. Status: ${text}`);
      }
    })
    .catch((err: any) => {
      if (isDebugEnabled()) {
        console.error(`Error sending event: [${name}]`);
        console.error(err);
      }
    });
};
