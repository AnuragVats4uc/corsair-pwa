import { FC, useState } from 'react'
import s from './FAQModule.module.scss'
import { FAQItemType } from './FAQModule'
import { ChevronDown, ChevronUp } from 'react-feather'
import snarkdown from 'snarkdown'
export interface FAQItemProps {
    faqItem: FAQItemType
}

export const FAQItem: FC<FAQItemProps> = ({ faqItem }): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false)
    const { question, answer } = faqItem

    const html = snarkdown(answer)

    return (
        <div className={s['info-container']}>
            <button
                className={s['qa-button']}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <div className={s['qa-span']}>
                        <p className={s['question-chevron-up']}>{question}</p>
                        <div className={s['chevron']}>
                            <ChevronUp />
                        </div>
                    </div>
                ) : (
                    <div className={s['qa-span']}>
                        <p className={s['question-chevron-down']}>{question}</p>
                        <div className={s['chevron']}>
                            <ChevronDown />
                        </div>
                    </div>
                )}
            </button>
            {isOpen && (
                <p
                    className={s['answer']}
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            )}
        </div>
    )
}

export default FAQItem
