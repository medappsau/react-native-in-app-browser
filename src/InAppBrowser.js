import React, {useState, useMemo, useRef} from 'react';
import styled from 'styled-components/native';
import urlparse from 'url-parse';
import RNModal from 'react-native-modal';
import RNWebView from 'react-native-webview';
import Share from 'react-native-share';
import {
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  Platform,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {isIphoneX} from 'react-native-iphone-x-helper';

const Header = styled.View`
  background-color: ${({backgroundColor}) => backgroundColor};
  color: ${({color}) => color};
  height: 80px;
  padding-left: 10px;
  padding-right: 10px;
  ${() => {
    if (!isIphoneX()) {
      return `padding-top: 40px`;
    }
  }}
`;
const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const LoadingWrapper = styled.View`
  flex-basis: 100%;
  position: relative;
  background-color: white;
`;
const LoadingComponentWrapper = styled.View`
  position: absolute;
  padding-top: 50%;
  align-items: center;
  justify-content: center;
  align-self: center;
`;
const Footer = styled.View`
    background-color: ${({backgroundColor}) => backgroundColor}
    color: ${({color}) => color}
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
`;
const Browser = styled.View`
  flex: 1;
`;
const Text = styled.Text`
  color: ${({color}) => color};
  font-size: 18px;
  ${({disabled}) => (disabled ? 'opacity: 0.5;' : '')}
`;
const Title = styled(Text)`
  width: 200px;
  font-size: 18px;
`;
const Modal = styled(RNModal)`
  margin-left: 0;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
`;
const WebView = styled(RNWebView)`
  flex: 1;
`;
export function InAppBrowser({
  url,
  open,
  close,
  isOpen,
  styles,
  onLoadEnd,
  LoadingComponent,
  ...rest
}) {
  const [currentUrl, setCurrentUrl] = useState(url);
  const [canGoForward, setCanGoForward] = useState(url);
  const [canGoBack, setCanGoBack] = useState(url);
  const initialTitle = useMemo(() => {
    if (!currentUrl) return '';
    const {hostname} = urlparse(currentUrl);
    return hostname || '';
  }, []);
  const [title, setTitle] = useState(initialTitle);
  const webview = useRef();
  return (
    <Modal isVisible={isOpen} onClose={close}>
      <Header {...styles}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <Buttons>
            <Text {...styles} onPress={close}>
              Cancel
            </Text>
            <Title {...styles} numberOfLines={1}>
              {title}
            </Title>
            <Text
              {...styles}
              onPress={() => {
                if (!webview.current) return;
                webview.current.reload();
              }}>
              <Icon name="refresh" size={20} />
            </Text>
          </Buttons>
        </SafeAreaView>
      </Header>
      <Browser>
        <WebView
          {...rest}
          ref={webview}
          source={{uri: url}}
          onLoadEnd={(event) => {
            const {nativeEvent} = event;
            setCurrentUrl(nativeEvent.url);
            setCanGoForward(nativeEvent.canGoForward);
            setCanGoBack(nativeEvent.canGoBack);
            setTitle(nativeEvent.title);
            onLoadEnd(event);
          }}
          startInLoadingState={true}
          renderLoading={() => (
            <LoadingWrapper>
              <LoadingComponentWrapper>
                <LoadingComponent />
              </LoadingComponentWrapper>
            </LoadingWrapper>
          )}
        />
      </Browser>
      <Footer {...styles}>
        <SafeAreaView>
          <Buttons>
            <Text
              disabled={!canGoBack}
              {...styles}
              onPress={() => {
                if (!canGoBack) return;
                webview.current.goBack();
              }}>
              <Icon name="chevron-left" size={20} />
            </Text>
            <Text
              disabled={!canGoForward}
              {...styles}
              onPress={() => {
                if (!canGoForward) return;
                webview.current.goForward();
              }}>
              <Icon name="chevron-right" size={20} />
            </Text>
            <Text {...styles} onPress={() => Share.open({url: currentUrl})}>
              <Icon name="share-square" light size={20} />
            </Text>
            <Text
              {...styles}
              onPress={() =>
                Linking.openURL(currentUrl || url).catch((e) =>
                  console.error(e),
                )
              }>
              <Icon
                name={Platform.OS === 'ios' ? 'safari' : 'chrome'}
                size={20}
                light
              />
            </Text>
          </Buttons>
        </SafeAreaView>
      </Footer>
    </Modal>
  );
}

const styles = {
  backgroundColor: 'rgba(17,46,127, 0.9)',
  color: 'white',
};

const noop = () => {};
InAppBrowser.defaultProps = {
  open: noop,
  close: noop,
  onLoadEnd: noop,
  LoadingComponent: ActivityIndicator,
  styles,
};
