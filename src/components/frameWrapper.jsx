import React from "react";
import { useRef, useState, useEffect} from "react";
export default function FrameWrapper ({html}) {
    const ref = useRef();
    const [height, setHeight] = useState('0px');

    const onLoad = () => {
        if (ref.current) {
            const iframeDoc = ref.current.contentWindow.document;
            if (iframeDoc && iframeDoc.body) {
                setHeight(iframeDoc.body.scrollHeight + 'px');
            }
        }
    };

    useEffect(() => {
        if(ref.current) {
            const iframe = ref.current;
            iframe.addEventListener('load', onLoad);
            return () => {
                iframe.removeEventListener('load', onLoad);
            }
        }
    }, [])

    return (
        <iframe
        ref={ref} onLoad={onLoad} className='w-full' id='iframe' srcDoc={html}
        height={height} scrolling='no' frameBorder={0}
        >
        </iframe>
    )
}