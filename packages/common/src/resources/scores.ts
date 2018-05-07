import { DefaultStoreDescriptions, GenericObject } from '../types';

export const totalHomeScoreIntro = 'Total Home Score livability scores give you insights on what '
  + 'you can expect from day-to-day life in a home. From neighborhood noise to how easy it is to '
  + 'get to amenities like grocery stores and restaurants, you’ll know how this home compares to '
  + 'others in the same neighborhood.';

export const scoreHints: GenericObject<string> = {
  quiet: 'Peace and quiet are priceless. This score reflects the noise levels in the surrounding '
    + 'area, taking into account busy roads, highways, trains, and more.',
  safety: 'Speeding cars and aggressive driving can make a neighborhood feel unsafe. This score '
    + 'reflects your ability to enjoy activities like walking, biking, or jogging with greater '
    + 'peace of mind.',
  errand: 'The ability to easily get your day-to-day errands done makes a big difference on '
    + 'quality of life. This score reflects your proximity to common errand locations like '
    + 'grocery stores, gas stations, dry cleaners and more.',
  traffic: 'Day-to-day traffic can significantly impact how you feel about a home. This score '
    + 'indicates the extent to which a home may be affected by traffic congestion on nearby roads '
    + 'during rush hour.',
  entertainment: 'Having fun things to do nearby can make a great home feel even better. This '
    + 'score measures a home’s proximity to common entertainment venues like restaurants/bars, '
    + 'movie theaters, recreational sports facilities, and more'
};

export const scoreDescriptions: DefaultStoreDescriptions = {
  quiet: {
    39: {
      display: 'Some Noise',
      description: 'Noise is likely to be regularly noticeable'
    },
    69: {
      display: 'Somewhat Quiet',
      description: 'You may notice some noise now and then'
    },
    100: {
      display: 'Very Quiet',
      description: 'This area is usually quiet and peaceful' 
    }
  },
  safety: {
    39: {
      display: 'Feels Somewhat Safe',
      description: 'You’re likely to notice erratic driving on a regular basis'
    },
    69: {
      display: 'Feels Safe',
      description: 'You may notice some erratic driving now and then' 
    },
    100: {
      display: 'Feels Very Safe',
      description: 'Erratic driving in the area is usually rare' 
    }
  },
  errand: {
    39: {
      display: 'Some Options',
      description: 'Some travel time required for most daily errands'
    },
    69: {
      display: 'Many Options',
      description: 'Many daily errand locations will be a quick trip' 
    },
    100: {
      display: 'Options Abound',
      description: 'Many nearby options for daily errands' 
    }
  },
  traffic: {
    39: {
      display: 'Some Traffic',
      description: 'Regular congestion during rush hour'
    },
    69: {
      display: '69 Traffic',
      description: 'There may be some congestion during rush hour' 
    },
    100: {
      display: 'Infrequent Traffic',
      description: 'Very little congestion, even during rush hour' 
    }
  },
  entertainment: {
    39: {
      display: 'Some Options',
      description: 'Some travel time required for most entertainment/dining options'
    },
    69: {
      display: 'Many Options',
      description: 'Many entertainment/dining options will be a quick trip' 
    },
    100: {
      display: 'Options Abound',
      description: 'Many nearby options for entertainment/dining' 
    }
  }
};
