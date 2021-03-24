# react-native-in-app-browser
Wraps react-native-webview in a modal for in-app browsing.

`yarn add @medapps/react-native-in-app-browser`

Cookies cannot be set with react-native-inappbrowser-reborn. This component was created to replace it.

set cookies before a url has been opened using: https://github.com/react-native-cookies/cookies

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


# Contributing


 `git clone https://github.com/medappsau/react-native-in-app-browser`
 
 `yarn`
 
 `yarn setup:example`
 
 `open ios/example.xcworkspace`
 
 press the play button
 
 before committing to master run: 
 
 `yarn setup:main`
 
 then commit and submit a PR :tada:

