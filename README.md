# react-native-in-app-browser

`yarn add @medapps/react-native-in-app-browser`

# API

This component wraps [WebView](https://github.com/react-native-webview/react-native-webview/blob/HEAD/docs/Reference.md), props are passed down to this component

### Non React Context

```js
import {InAppBrowserProvider} from '@medapps/react-native-in-app-browser';

function MyApp() {
  return (
    <InAppBrowserProvider
      ErrorState={CustomErrorStateComponent} // optional ({error, onGoBack}) =>
      LoadingComponent={CustomLoadingComponent} // optional
      theme={customTheme} // optional {color, backgroundColor}
    >
      <Example />
    </InAppBrowserProvider>
  );
}

function Example() {
  const {open, close, url, isOpen} = useInAppBrowser();
  return <Text onPress={() => open({url: 'https://med.app'})}>Open Url!</Text>;
}
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
