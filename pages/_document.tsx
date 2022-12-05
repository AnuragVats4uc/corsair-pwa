import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* Generate favicon and related icons : https://realfavicongenerator.net/ */}
                    <meta name="application-name" content="Pylot" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta
                        name="apple-mobile-web-app-status-bar-style"
                        content="default"
                    />
                    <meta name="apple-mobile-web-app-title" content="Pylot" />
                    <meta name="format-detection" content="telephone=yes" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta
                        name="msapplication-config"
                        content="/browserconfig.xml"
                    />
                    <meta name="msapplication-TileColor" content="#2B5797" />
                    <meta name="msapplication-tap-highlight" content="no" />
                    <meta name="theme-color" content="#ffffff" />

                    <link
                        rel="apple-touch-icon"
                        href="/meta-icons/apple-touch-icon.png"
                    />

                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/meta-icons/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/meta-icons/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/manifest.json" />
                    <link
                        rel="mask-icon"
                        href="/meta-icons/safari-pinned-tab.svg"
                        color="#5bbad5"
                    />
                    <link rel="shortcut icon" href="/meta-icons/favicon.ico" />

                    {/* Generate splash screen : https://appsco.pe/developer/splash-screens */}
                    <link
                        href="/meta-icons/splashscreens/iphone5_splash.png"
                        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
                        rel="apple-touch-startup-image"
                    />
                    <link
                        href="/meta-icons/splashscreens/iphone6_splash.png"
                        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
                        rel="apple-touch-startup-image"
                    />
                    <link
                        href="/meta-icons/splashscreens/iphoneplus_splash.png"
                        media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
                        rel="apple-touch-startup-image"
                    />
                    <link
                        href="/meta-icons/splashscreens/iphonex_splash.png"
                        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
                        rel="apple-touch-startup-image"
                    />
                    <link
                        href="/meta-icons/splashscreens/iphonexr_splash.png"
                        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
                        rel="apple-touch-startup-image"
                    />
                    <link
                        href="/meta-icons/splashscreens/iphonexsmax_splash.png"
                        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
                        rel="apple-touch-startup-image"
                    />
                    <link
                        href="/meta-icons/splashscreens/ipad_splash.png"
                        media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
                        rel="apple-touch-startup-image"
                    />
                    <link
                        href="/meta-icons/splashscreens/ipadpro1_splash.png"
                        media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
                        rel="apple-touch-startup-image"
                    />
                    <link
                        href="/meta-icons/splashscreens/ipadpro3_splash.png"
                        media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
                        rel="apple-touch-startup-image"
                    />
                    <link
                        href="/meta-icons/splashscreens/ipadpro2_splash.png"
                        media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
                        rel="apple-touch-startup-image"
                    />

                    <link
                        rel="preconnect"
                        href={process.env.NEXT_PUBLIC_API_GATEWAY_URL}
                    />
                    <link
                        rel="preconnect"
                        href="https://cookie-cdn.cookiepro.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://www.googletagmanager.com/"
                    />

                    {process.env.NODE_ENV === 'production' && (
                        <script src="/scripts/newrelic.js" />
                    )}
                    <style>
                        {`
                            .ot-floating-button__front svg {
                                margin: auto;
                            }
                        `}
                    </style>
                </Head>
                <body className="loading">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
