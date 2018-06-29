import { log, track, DetailedScore } from '@shine-api/common';
import * as ScoreCard from '../components/ScoreCard.hbs';
import * as ScoreTabContainer from '../components/ScoreTabContainer.hbs';

export interface TabState {
  startIndex: number;
  totalVisible: number;
  selectedId: string;
  selected?: Element;
}

export const tabState: TabState = {
  startIndex: 0,
  totalVisible: 0,
  selectedId: 'quiet'
};

export const next = () => {
  const { TotalHomeScore: { scores } } = (window as any);
  const { startIndex, totalVisible = scores.length } = tabState;
  if (scores.length > totalVisible + startIndex) {
    tabState.startIndex = startIndex + 1;
    displayTabs();
  }
};

export const previous = () => {
  const { TotalHomeScore: { scores } } = (window as any);
  const { startIndex, totalVisible = scores.length } = tabState;
  if (startIndex > 0) {
    tabState.startIndex = startIndex - 1;
    displayTabs();
  }
};

export const selectTab = (element: Element) => {
  const { TotalHomeScore: { lat, lon, scores } } = (window as any);
  const { selected } = tabState;
  const nameNode = element.getElementsByClassName('score-tab-name').item(0);
  const name = nameNode
    ? nameNode.textContent
      ? nameNode.textContent.trim()
      : element.id
    : element.id;
  const scoreCard = document.getElementById('ths-score-card');
  if (selected) {
    selected.className = 'ths-score-tab';
  }
  element.className = 'ths-score-tab-selected';
  if (scoreCard) {
    scoreCard.outerHTML = ScoreCard(scores
      .find((score: DetailedScore) => score.score.id === element.id));
  }
  tabState.selected = element;
  tabState.selectedId = element.id;
  track(`Tab Selected - ${name}`, { lat, lon }, true);
};

export const getTabContainerWidth = () => {
  const tabContainer = document.getElementById('ths-score-tab-container');

  if (!tabContainer) {
    log('Error: Could not find THS tab container');
    return 0;
  }
  
  return tabContainer.clientWidth;
};

export const calculateTabs = () => {
  const { TotalHomeScore: { scores } } = (window as any);
  const { startIndex, totalVisible = scores.length } = tabState;
  const clientWidth = getTabContainerWidth();
  const minTabWidth = 145;
  const numberOfTabs = Math.floor(clientWidth / minTabWidth);
  const newTotalVisible = numberOfTabs > scores.length
    ? scores.length : numberOfTabs;
  
  if (newTotalVisible !== totalVisible) {
    const newStart = 0;
    tabState.totalVisible = newTotalVisible;
    tabState.startIndex = newStart;
  }
  return tabState;
};

export const enableHandlers = () => {
  const { selectedId } = tabState;
  const previousArrow = document.getElementById('ths-score-previous');
  const nextArrow = document.getElementById('ths-score-next');
  const tabs = document.getElementsByClassName('ths-score-tab');
  const documentToSelect = document.getElementById(selectedId);

  if (!previousArrow || !nextArrow) {
    log('Error finding next and previous icons');
    return;
  }

  previousArrow.addEventListener('click', previous);
  nextArrow.addEventListener('click', next);
  Array.from(tabs).forEach((tab, key) =>
    tab.addEventListener('click', () => selectTab(tab))
  );

  if (documentToSelect) {
    selectTab(documentToSelect);
  }
};

export const updateTabContainer = (updatedScores?: DetailedScore[]) => {
  const { TotalHomeScore: { scores } } = (window as any);
  const { startIndex, totalVisible } = tabState;
  const tabContainer = document.getElementById('ths-score-tab-container');
  const disablePrevArrow = (startIndex === 0)
    ? 'disabled'
    : '';
  const disableNextArrow = (scores.length > totalVisible + startIndex)
    ? ''
    : 'disabled';
  const enableNav = (scores.length > totalVisible)
    ? 'visible'
    : '';
  if (!tabContainer) {
    log('Error: Could not find THS tab container');
    return;
  }
  tabContainer.outerHTML = ScoreTabContainer({
    disablePrevArrow,
    disableNextArrow,
    enableNav,
    scores: updatedScores || scores
  });
  enableHandlers();
};

export const displayTabs = () => {
  const { TotalHomeScore: { scores } } = (window as any);
  const { startIndex, totalVisible } = calculateTabs();
  const updatedScores = scores.slice(startIndex, totalVisible + startIndex);

  updateTabContainer(updatedScores);
};

export const tabController = () => {
  window.addEventListener('resize', displayTabs);
  displayTabs();
};
