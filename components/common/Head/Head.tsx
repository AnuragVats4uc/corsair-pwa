/* eslint-disable i18next/no-literal-string */
import { FC } from 'react'
import NextHead from 'next/head'
import Script from 'next/script'
import { socialDefaultContent } from '@config/seo/defaultContents'
import { SEO } from '@corratech/corsair-seo'

const fontsToPreload = [
    'https://use.typekit.net/syi3qwd.css',
    '/fonts/BebasNeuePro/BebasNeuePro-SmEBd.woff',
    '/fonts/BebasNeuePro/BebasNeuePro-SmEBd.woff2',
    '/fonts/BebasNeuePro/BebasNeueProExpandedBold.woff',
    '/fonts/BebasNeuePro/BebasNeueProExpandedBold.woff2',
    '/fonts/BebasNeuePro/BebasNeueProSemiExpXBold.woff',
    '/fonts/BebasNeuePro/BebasNeueProSemiExpXBold.woff2',
    '/fonts/BebasNeuePro/BebasNeueProMiddle.woff',
    '/fonts/BebasNeuePro/BebasNeueProMiddle.woff2',
    '/fonts/Verveine/Verveine-Regular.woff',
    '/fonts/Verveine/Verveine-Regular.woff2'
]

const Head: FC = () => {
    const fonts = fontsToPreload.map((font) => (
        <link rel="preload" href={font} as="font" crossOrigin="" key={font} />
    ))

    return (
        <>
            <NextHead>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="manifest"
                    href="/site.webmanifest"
                    key="site-manifest"
                />
                {fonts}
            </NextHead>
            <Script
                id="gigya"
                src="https://cdns.gigya.com/js/gigya.js?apiKey=4_1M8KcZQw_A1o00SELaeYiA"
                type="text/javascript"
            />
            <SEO socialDefaultContent={socialDefaultContent} />
        </>
    )
}

export default Head
