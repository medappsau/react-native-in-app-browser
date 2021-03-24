import React, {createContext, useState, useEffect, useContext} from 'react';
import {InAppBrowser} from './InAppBrowser';

export const InAppBrowserContext = createContext();

let subscriber = () => {};
export const openURL = (url) => {
  subscriber(url);
};
let ready = false;
export const isReady = () => ready;
export function InAppBrowserProvider({
  children,
  theme,
  ErrorState,
  LoadingComponent,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUrl, setUrl] = useState();
  const open = ({url}) => {
    setUrl(url);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    ready = true;
    subscriber = (url) => open({url});
  }, [open]);
  return (
    <InAppBrowserContext.Provider
      value={{
        url: currentUrl,
        open,
        close,
        isOpen,
      }}>
      <InAppBrowser
        {...rest}
        url={currentUrl}
        ErrorState={ErrorState}
        LoadingComponent={LoadingComponent}
        isOpen={isOpen}
        open={open}
        styles={theme}
        close={close}
      />
      {children}
    </InAppBrowserContext.Provider>
  );
}

export function useInAppBrowser() {
  const {url, open, close, isOpen} = useContext(InAppBrowserContext);

  return {
    url,
    open,
    close,
    isOpen,
  };
}
