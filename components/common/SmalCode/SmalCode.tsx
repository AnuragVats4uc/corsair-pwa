import React, { useEffect } from 'react'
import s from './SmalCode.module.scss'
import { ICalloutBlock } from '../types'
import Head from 'next/head'
interface SmalCodeProps {
    props: ICalloutBlock
}

const SmalCode = ({ props }: SmalCodeProps) => {
    /**
     * Needed for jQuery to load first, then we load these scripts on mount
     */
    useEffect(() => {
        const scriptUrls = [
            'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.7.6/jquery.nicescroll.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.min.js',
            '/script/modernizr-respond.min.js',
            '/scripts/tween-max.min.js',
            '/scripts/corsair-pdp.js',
            '/scripts/elite-lcd.js'
        ]

        scriptUrls.forEach((url) => {
            const $scriptTag = document.createElement('script')
            $scriptTag.classList.add('corsair-script')
            $scriptTag.src = url
            document.head.appendChild($scriptTag)
        })

        return () => {
            const $corsairScripts = document.querySelectorAll('.corsair-script')
            $corsairScripts.forEach((script) => {
                document.head.removeChild(script)
            })
        }
    }, [])
    return (
        <>
            {props.script && (
                <Head>
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" />
                </Head>
            )}
            <div id="pdp-corsair" className={s.pdpWrapper}>
                <div className="panel2">
                    <div className="content">
                        <div
                            dangerouslySetInnerHTML={{ __html: props.markup }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SmalCode
