import { log, track, ApiParameters } from '@shine-api/common';
import * as Footer from '../components/Footer.hbs';

export interface FooterProps {
  lat: number;
  lon: number;
  footer: HTMLElement | null;
}

export const updateFooter = (areScoresUseful: boolean) => {
  const footer = document.getElementById('ths-footer');
  const updatedFooter = (areScoresUseful)
    ? { thumbsUp: 'selected' }
    : { thumbsDown: 'selected' };

  if (footer) {
    footer.outerHTML = Footer(updatedFooter);
  }
};

export const feedback = (areScoresUseful: boolean) => {
  const { lat, lon } = window.TotalHomeScore;
  const trackingEvent = areScoresUseful ? 'Thumbs up' : 'Thumbs down';
  localStorage.setItem(
    `ths_widget.feedback.${lat}.${lon}`, 
    JSON.stringify({ areScoresUseful }));
  track(`Feedback - ${trackingEvent}`, { lat, lon }, true);
  updateFooter(areScoresUseful);
  enableHandlers();
};

export const enableHandlers = () => {
  const thumbsUp = document.getElementById('ths-footer-thumbsUp');
  const thumbsDown = document.getElementById('ths-footer-thumbsDown');

  if (!thumbsUp || !thumbsDown) {
    log('Error finding Thumbs Up or Thumbs down icons');
    return;
  }

  thumbsUp.addEventListener('click', () => feedback(true));
  thumbsDown.addEventListener('click', () => feedback(false));
};

export const loadPreviousFeedback = () => {
  const { lat, lon } = window.TotalHomeScore;
  const savedFeedback =
    localStorage.getItem(`ths_widget.feedback.${lat}.${lon}`);

  if (savedFeedback) {
    const { areScoresUseful } = JSON.parse(savedFeedback);
    updateFooter(areScoresUseful);
  }
};

export const feedbackController = () => {
  const footer = document.getElementById('ths-footer');

  if (!footer) {
    log(`Error: Cannot find footer 'ths-footer'`);
    return;
  }

  loadPreviousFeedback();
  enableHandlers();
};
