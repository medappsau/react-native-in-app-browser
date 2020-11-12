# react-native-in-app-browser

`yarn add @medapps/react-native-in-app-browser`

# API

This component wraps [WebView](https://github.com/react-native-webview/react-native-webview/blob/HEAD/docs/Reference.md), props are passed down to this component

### Non React Context

```js
import {openURL} from '@medapps/react-native-in-app-browser';

openURL(url); // opens url
```

### React Context

```js
import {useInAppBrowser} from '@medapps/react-native-in-app-browser';

function ExampleComponent() {
  const {open, close, url, isOpen} = useInAppBrowser();

  return (
    <Touchable onPress={() => open({url})}>
      <Text>Open!</Text>
    </Touchable>
  );
}
```
