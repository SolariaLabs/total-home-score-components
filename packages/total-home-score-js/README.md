# Total Home Score - Plain Javascript Component
A plain javascript component for rendering Total Home Score livability scores, powered by the [Shine Api](https://developers.solarialabs.com).

## Usage
To leverage the plain javascript component, the following two script tags to your page, and a div container for the widget to get added to:

```html
<div id="widget-container"></div>
<script lang="text/javascript">
  TotalHomeScore = {
    apiKey: 'API_KEY_FROM_SHINE_API',
    lat: 42,
    lon: -71,
    id: "widget-container"
  }
</script>
<script src="<path_to_js_file>"></script>
```

The script tags will import the javascript component and place dom elements inside of the given `widget-container` element. 
