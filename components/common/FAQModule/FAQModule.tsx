import { FC, useState } from 'react'
import { FAQItem } from './FAQItem'
import s from './FAQModule.module.scss'
import cn from 'classnames'

export interface Meta {
    contentType: string
}
export interface FAQItemType {
    question: string
    answer: string
    title: string
    meta: Meta
}
export interface FAQModuleType {
    title: string
    identifier: string
    heading: string
    defaultNum: number
    meta: Meta
    showMore: string
    showLess: string
    useFaqSchema: boolean
    faqItem: FAQItemType[]
}
export interface FAQModuleProps {
    faqModule: FAQModuleType
}

export const FAQModule: FC<FAQModuleProps> = ({ faqModule }) => {
    const [currNumShown, setCurrNumShown] = useState(faqModule?.defaultNum)

    if (!faqModule) {
        return null
    }

    const { faqItem = [] } = faqModule
    const heading = faqModule.heading
    const defaultNum = faqModule.defaultNum
    const showMore = faqModule.showMore
    const showLess = faqModule.showLess
    const faqItemLength = faqModule.faqItem.length

    const showMoreFaqItems = () => setCurrNumShown(faqItemLength)
    const showLessFaqItems = () => setCurrNumShown(defaultNum)

    // if there's more FAQ's than what is shown on the screen, display the showMore button
    const isMoreToLoad = faqItemLength > currNumShown
    // if the number of FAQ's is greater than the default number set in Contentful, display the showMore or showLess button depending on what is the user has clicked
    const showButtons = faqItemLength > defaultNum

    return (
        <div className={cn(s['container'])}>
            <div className={cn(s['content-header'])}>
                {heading.toUpperCase()}
            </div>
            <div className={cn(s['content-group'])}>
                {faqItem.slice(0, currNumShown).map((faqItem, index) => (
                    <FAQItem faqItem={faqItem} key={index} />
                ))}
            </div>
            <div>
                {showButtons && (
                    <div>
                        {isMoreToLoad ? (
                            <div className={s['show-button-container']}>
                                <button
                                    className={s['show-more']}
                                    onClick={showMoreFaqItems}
                                >
                                    {showMore}
                                </button>
                            </div>
                        ) : (
                            <div className={s['show-button-container']}>
                                <button
                                    className={s['show-less']}
                                    onClick={showLessFaqItems}
                                >
                                    {showLess}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
export default FAQModule
