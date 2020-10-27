import React, { useState, useMemo, useRef} from 'react'
import styled from 'styled-components/native';
import urlparse from 'url-parse';

const Header = styled.View``;
const Footer = styled.View``;
const Browser = styled.View``;
const Text = styled.Text``;

export function InAppBrowser({
    url, 
    open,
    close, 
    isOpen
}) {

    const [currentUrl, setCurrentUrl] = useState(url);
    const initialTitle = useMemo(() => {
        if (!currentUrl) return '';
        const {hostname} = urlparse(currentUrl);
        setTitle(hostname)
    }, [])
    const [title, setTitle] = useState(initialTitle);
    const webview = useRef()
    return (
        <Modal isOpen={isOpen}>
            <Header>
                <Text>{title}</Text>
            </Header>
            <Browser>
                <WebView
                {...rest}
                ref={webview}
                source={{uri: url}} onLoadEnd={event => {
                    const {nativeEvent} = event;
                    setCurrentUrl(nativeEvent.url);
                    setCanGoForward(nativeEvent.canGoForward);
                    setCanGoBack(nativeEvent.canGoBack);
                    setTitle(nativeEvent.title);
                }}/>
            </Browser> 
            <Footer>
            </Footer>
        </Modal>
    );
}