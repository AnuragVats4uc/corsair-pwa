import { ContentPage } from '@components/common/ContentPage/ContentPage'
import { TypeComponentsTab } from '@components/common/Tabs/ProductTabContent'
import { IProductContentfulResponse } from '@components/common/types'
import { ContentJsonItem } from '@pylot-data/hooks/contentful/use-content-json'

type ContentPageProps = Array<{
    identifier: string
    [k: string]: unknown
    meta: { contentType: string }
}>

export const convertProductContentfulToContentPage = (
    productContentfulToContentPage: IProductContentfulResponse<TypeComponentsTab>
): ContentJsonItem<ContentPage> => {
    return {
        identifier: productContentfulToContentPage.identifier,
        entries: JSON.stringify(productContentfulToContentPage),
        parsedEntries: {
            identifier: productContentfulToContentPage.identifier,
            pageContentEntries: productContentfulToContentPage.contentModules as ContentPageProps,
            meta: productContentfulToContentPage.meta,
            title: '',
            useFaqSchema: false
        }
    }
}
