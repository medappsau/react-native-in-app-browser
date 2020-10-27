import React, {
    createContext,
    useState,
    useContext
} from 'react';

export const InAppBrowserContext = createContext();
export function InAppBrowserProvider({children}) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentUrl, setUrl] = useState();
    const open = ({
        url
    }) => {
        setUrl(url);
        setIsOpen(true);
    }

    const close = () => {
        setIsOpen(false);
    }

    return <InAppBrowserContext.Provider value={{
        url, open, close, isOpen
    }}>
        <InAppBrowser url={currentUrl} isOpen={isOpen} open={open} close={close}/>
        {children}
    </InAppBrowserContext.Provider>
}


export function useInAppBrowser() {
    const {
        url, open, close, isOpen
    } = useContext(InAppBrowserContext);

    return {
        url, open, close, isOpen
    }
}

