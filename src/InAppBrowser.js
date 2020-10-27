

export function InAppBrowser({
    url, 
    open,
    close, 
    isOpen
}) {

    const [currentUrl, setCurrentUrl] = useState(url);
    const initialTitle = useMemo(() => {
        const {hostname} = urlparse(currentUrl);
        setTitle(hostname)
    }, [])
    const [title, setTitle] = useState(initialTitle);

    return (

    );
}