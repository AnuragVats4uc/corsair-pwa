import {
    GetStaticProps,
    GetStaticPropsContext,
    InferGetStaticPropsType
} from 'next'
import SideBanner from '../components/common/SideBanner/SideBanner'
import getContentJson from '@pylot-data/api/operations/get-content-json'
import { ContentPage } from '@components/common/ContentPage/ContentPage'
import {
    ImageType,
    useContentJson
} from '../framework/pylot/hooks/contentful/use-content-json'
import s from '@pagestyles/Downloads.module.scss'

const DOWNLOADS_PAGE = 'downloads-page'
const DOWNLOADS = 'download'

export interface DownloadPageContent extends ContentPage {
    banners: BannerContent[]
}
export interface BannerContent {
    title: string
    heading?: string
    desktopImageOrVideo?: ImageType
    logo?: ImageType
    shortDescription?: string
    ctaButton: { url?: string; displayText?: string }
}

export const getStaticProps: GetStaticProps = async ({
    locale
}: GetStaticPropsContext) => {
    try {
        const { data } = await getContentJson<ContentPage>({
            queryVariables: {
                identifier: [DOWNLOADS_PAGE],
                contentType: DOWNLOADS,
                options: {
                    level: 5
                }
            },
            locale
        })

        return {
            props: {
                content: data
            },
            revalidate: 14400
        }
    } catch (e) {
        console.log('Downloads page GETSTATICPROPS ERROR')
        console.log(e)

        return {
            props: {
                content: null
            },
            revalidate: 14400
        }
    }
}

export default function Downloads({
    content
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
    const { data } = useContentJson<DownloadPageContent>(
        {
            identifier: [DOWNLOADS_PAGE],
            contentType: 'download',
            options: {
                level: 5
            }
        },
        {
            revalidateOnFocus: false,
            revalidateOnMount: true,
            initialData: { data: content }
        }
    )

    const banners = data?.[0]?.parsedEntries?.banners ?? []

    return (
        <div className="bg-grey h-full">
            <h1
                className="text-center color text-white bg-black py-20 ppercase
                font-bebasNeue text-7xl tracking-wider mb-8"
                // eslint-disable-next-line i18next/no-literal-string
            >
                Downloads Placeholder
            </h1>
            <div
                className={`${s['downloads-container']} flex justify-center mx-auto`}
            >
                <div className="w-full xl:w-3/4 xl:pr-7">
                    <div
                        className="py-16 px-5 shadow mb-4 bg-white"
                        // eslint-disable-next-line i18next/no-literal-string
                    >
                        Downloads Placeholder
                    </div>
                    <div
                        className="py-16 px-5 shadow mb-4 bg-white"
                        // eslint-disable-next-line i18next/no-literal-string
                    >
                        Downloads Placeholder
                    </div>
                    <div
                        className="py-16 px-5 shadow mb-4 bg-white"
                        // eslint-disable-next-line i18next/no-literal-string
                    >
                        Corsair iCUE Download Placeholder
                    </div>
                </div>
                <div className="hidden xl:w-1/4 xl:block">
                    {banners.map((banner, index) => (
                        <SideBanner key={index} content={banner} />
                    ))}
                </div>
            </div>
        </div>
    )
}
