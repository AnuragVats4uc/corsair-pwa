import React, { FC } from 'react'
import Linkify from 'react-linkify'

interface ITextArea {
    text: string
    target?: string
}

export const TextArea: FC<ITextArea> = ({ text, target = '_blank' }) => {
    return (
        <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
                <a target={target} href={decoratedHref} key={key}>
                    {decoratedText}
                </a>
            )}
        >
            {text}
        </Linkify>
    )
}
