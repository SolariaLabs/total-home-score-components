import { sendEvent } from '../api';
import { getUser, log, isDebugEnabled } from '../utils';
import { Event } from '../types';

export const track = (name: string, event: Event = {}, store: boolean = false) => {
  if (store) {
    const eventKey = `ths_widget.tracking.${name}.${JSON.stringify(event)}`;
    if (localStorage.getItem(eventKey)) {
      log(`Skipping event [${name}]. Event previously sent.`);
      return Promise.resolve();
    }
    localStorage.setItem(eventKey, 'true');
  }

  log(`Event: [${JSON.stringify({ name, ...event, user: getUser() })}]`);
  
  return isDebugEnabled()
  ? Promise.resolve()
  : sendEvent([{ name, ...event, user: getUser() }])
      .then(response => response.text())
      .then((text: string) => {
        log(`Event [${name}] sent. Status: ${text}`);
      })
      .catch((err: any) => {
        log(`Error sending event: [${name}]`);
      });
};
