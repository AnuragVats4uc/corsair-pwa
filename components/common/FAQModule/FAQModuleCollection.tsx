import { FC } from 'react'
import { FAQModule, FAQModuleType, Meta, FAQItemType } from './FAQModule'
import { FAQPageJsonLd } from 'next-seo'
import { useRouter } from 'next/router'
import s from './FAQModule.module.scss'
import cn from 'classnames'

export interface FAQModuleCollectionType {
    faqModule: FAQModuleType
    useFaqSchema: boolean
    title: string
    identifier: string
    heading: string
    defaultNum: number
    showMore: string
    showLess: string
    meta: Meta
    faqItem: FAQItemType[]
}
export interface FAQModuleCollectionProps {
    items: FAQModuleCollectionType[]
    isPlpPage?: boolean
}

export const FAQModuleCollection: FC<FAQModuleCollectionProps> = ({
    items,
    isPlpPage
}) => {
    const router = useRouter()
    if (!items) {
        return null
    }

    const faqModule = items

    let outsideHomePage = true
    if (router.pathname === '/') {
        outsideHomePage = false
    }

    const faqArray: {
        questionName: string
        acceptedAnswerText: string
    }[] = []
    items?.forEach((element) => {
        if (element.useFaqSchema === true) {
            element.faqItem.forEach((item) => {
                faqArray.push({
                    questionName: item.question,
                    acceptedAnswerText: item.answer
                })
            })
        }
    })

    let mainEntityPopulated = true
    if (faqArray.length < 1) {
        mainEntityPopulated = false
    }

    return (
        <>
            {outsideHomePage && mainEntityPopulated && (
                <FAQPageJsonLd mainEntity={faqArray} />
            )}
            <div className={cn(s['element-container'])}>
                <div
                    className={cn(s['element-group'], 'self-center', {
                        [s['plp-margin']]: isPlpPage
                    })}
                >
                    {faqModule.map((faqModule, identifier) => (
                        <FAQModule faqModule={faqModule} key={identifier} />
                    ))}
                </div>
            </div>
        </>
    )
}
export default FAQModuleCollection
