import { FC } from 'react'
import {
    ContentJson,
    useContentJson
} from '@pylot-data/hooks/contentful/use-content-json'
import { RichContent } from '@corratech/pylot-rich-content'
import type { CmsBlock } from '@pylot-data/pylotschema'

export type WelcomeMessageProps = {
    initialBlockData?: {
        data: ContentJson<CmsBlock>
    }
    blockIdentifier: string
}

export const WelcomeMessage: FC<WelcomeMessageProps> = ({
    initialBlockData,
    blockIdentifier
}) => {
    const { data, error } = useContentJson<CmsBlock>(
        {
            identifier: [blockIdentifier],
            contentType: 'cmsBlock'
        },
        {
            revalidateOnFocus: false,
            revalidateOnMount: true,
            initialData: initialBlockData
        }
    )

    if (!data || error) return null

    return (
        <div className="account-welcome-message">
            <RichContent html={data[0]?.parsedEntries?.content} />
        </div>
    )
}
