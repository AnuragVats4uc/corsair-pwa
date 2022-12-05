import React, { useEffect, useRef } from 'react'
import { ICalloutBlock } from '../types'
interface IFrameProps {
    props: ICalloutBlock
}

const IFrameEmbed = ({ props }: IFrameProps) => {
    const iFrameContainer = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const setIframeHeightCO = (ht: number) => {
            const { current } = iFrameContainer

            if (current) current.style.height = `${ht}px`
        }

        const handleDocHeightMsg = (event: MessageEvent) => {
            const { origin } = event

            if (
                origin === 'https://www.elgato.com' ||
                origin === 'https://staging.elgato.com'
            ) {
                const data = JSON.parse(event.data)

                if (data['docHeight']) setIframeHeightCO(data['docHeight'])
            }
        }

        window.addEventListener('message', handleDocHeightMsg, false)

        return () => window.removeEventListener('message', handleDocHeightMsg)
    }, [])

    return (
        <div className="iframewrapper w-full mx-0 my-auto">
            <div className="iframe-container" ref={iFrameContainer}>
                <iframe
                    title="PDP iFrame"
                    className="border-0 h-full left-0 w-full"
                    scrolling="no"
                    src={props.shopifyUrl || props.url}
                />
            </div>
        </div>
    )
}

export default IFrameEmbed
