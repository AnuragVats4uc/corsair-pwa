import React, { useEffect, useRef } from 'react'
import { IHTMLBlock } from '../types'
import s from './styles/index.module.scss'
import { useScript } from './hooks/useScript'
import decode from '../../../lib/utils/htmlencoder'

interface HtmlBlockProps {
    props: IHTMLBlock
}

const HtmlBlock = ({ props }: HtmlBlockProps) => {
    const externalJsCssRef = useRef<HTMLDivElement | null>(null)
    //inject linked js to render in order

    useScript(props.linkedScript)

    const encodedHtml = decode(props.markup)

    useEffect(() => {
        const externalJsCss: string[] = []
        if (props.linkedScript?.length) {
            props.linkedScript?.forEach((data) => {
                if (data.linkedCss?.length) {
                    const cssLink = data.linkedCss?.map(
                        (links) =>
                            `<link href="${links}" type="text/css" rel="stylesheet" />`
                    )
                    externalJsCss?.push(...cssLink.flat())
                }
                if (data?.linkedCss?.length && externalJsCssRef.current) {
                    externalJsCssRef.current.innerHTML = ''
                    const fragment = document
                        .createRange()
                        .createContextualFragment(externalJsCss?.join(''))
                    externalJsCssRef?.current?.append(fragment)
                }
            })
        }
    }, [props.linkedScript])

    return (
        <>
            <div ref={externalJsCssRef} />
            <div id={s['HtmlBlock']}>
                <div className="pdpWrapper" id="pdp-corsair">
                    <section id="panel2">
                        <div className="content">
                            <div id="pdpWrapper">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: encodedHtml
                                    }}
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default HtmlBlock
