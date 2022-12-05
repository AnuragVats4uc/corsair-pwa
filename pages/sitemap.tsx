import { GetServerSideProps } from 'next'
import { REGION_CODES_MAP } from 'localesConfig'

const isRegionValid = (region: string): boolean =>
    !!region && Object.values(REGION_CODES_MAP).includes(region?.toUpperCase())

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const { url: filename } = req

    if (!filename || !filename.endsWith('.xml')) {
        res.setHeader('Content-Type', 'text/html')
        res.write('Invalid filename')
        res.end()
        return { props: {} }
    }

    const filenameFormatted = filename.replace(/\//g, '')
    const region = filenameFormatted.split('-')[0]

    if (!isRegionValid(region)) {
        res.setHeader('Content-Type', 'text/html')
        res.write('Invalid region')
        res.end()

        return { props: {} }
    }

    const headers: Record<string, string> = {
        'x-pylot-query': 'sitemap',
        region: region
    }
    if (process.env.NEXT_PUBLIC_X_PYLOT_BACKEND) {
        headers['x-pylot-backend'] = process.env.NEXT_PUBLIC_X_PYLOT_BACKEND
    }
    const sitemapEndpoint = String(
        process.env.NEXT_PUBLIC_API_GATEWAY_URL
    ).replace('/graphql', '')

    const serviceResponse = await fetch(
        `${sitemapEndpoint}/sitemap/${filenameFormatted}`,
        {
            headers
        }
    )

    const sitemap = await serviceResponse.text()

    res.setHeader('Content-Type', 'text/xml')
    res.write(sitemap)
    res.end()

    return { props: {} }
}

export default getServerSideProps
