import { totalHomeScoreIntro, DetailedScore } from '@shine-api/common';
import { buildElement, div, span, ul } from './dom-helper';

export const scoreCards = (scores: DetailedScore[]) => 
  scores.map(({ score, hint, colorClass, descriptions, value }) => {
    const scoreTitle = div(
      { class: 'row score-title' },
      span({ title:  score.name, text: score.name }),
      buildElement('i', {
        class: 'fa fa-question-circle',
        title: hint,
        'data-toggle': 'tooltip' 
      })
    );
    
    const scoreCircle = div(
      { class: 'col-md-1 score-circle-container' },
      div({ 
        class: `score-circle ${colorClass}`, 
        text: value.toString()
      })
    );

    const scoreDescription = div(
      { class: 'col-md-3 score-level-container' },
      div({
        class: 'score-level-title', 
        text: descriptions.score.display
      }),
      div({
        class: 'score-level-description',
        text: descriptions.score.description
      })
    );
    
    const scoreFactors = div(
      { class: 'col-md-6' },
      div({ text: 'Why were points deducted?' }),
      ul({ class: 'score-factor-list' }, descriptions.factors)
    );

    return div(
      { class: 'score-widget-body' },
      scoreTitle,
      div(
        { class: 'row' },
        scoreCircle,
        scoreDescription,
        scoreFactors
      )
    );
  });

export const loadScoreCards = (id: string, scores: DetailedScore[]) => {
  console.log(document.getElementsByTagName('div'));
  const parentElement = document.getElementById(id);
  if (!parentElement) {
    console.log(`Error: Cannot find $parentElement`);
    return;
  }

  const thsWidget = div(
    {
      id: 'total-home-score', 
      class: 'total-home-score-widget'
    },
    div({ class: 'total-home-score-intro', text: totalHomeScoreIntro }),
    ...scoreCards(scores),
    div(
      {
        class: 'total-home-score-footer',
        text: 'Total Home Score is powered by'
      },
      buildElement('a', {
        href: 'https://developers.solarialabs.com',
        target:'_blank',
        text: 'Shine API'
      })
    )
  );

  parentElement.appendChild(thsWidget);
};

