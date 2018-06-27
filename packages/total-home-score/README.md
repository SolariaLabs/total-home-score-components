# Total Home Score - React Component
A React component for rendering Total Home Score livability scores, powered by the [Shine Api](https://developers.solarialabs.com).

## Usage 
To leverage the React component, install the following package from `npm`:

```bash
npm install @shine-api/total-home-score
```

Once installed, this component can be leveraged in your app by passing in the `apiKey` from your Shine Api App and the `lat` and `lon` coordinates for the desired location to display information for.

If your app needs to process the score results directly, such as hiding the component entirely if no scores are present, you can pass in a `callback` function to the component. This function will get called with the scores or an empty array if no scores were returned from the API.

```javascript
import React from 'react';

import TotalHomeScore from '@shine-api/total-home-score';
import '@shine-api/total-home-score/dist/main.css';

const apiKey = 'API_KEY_FROM_SHINE_API';
const lat = 42;
const lon = -71;

const callback = scores => {
  // Process scores directly
};

const ExampleApp = () => (
  <div>
    <TotalHomeScore apiKey={apiKey} lat={lat} lon={lon} callback={callback} />
  </div>
);
```
