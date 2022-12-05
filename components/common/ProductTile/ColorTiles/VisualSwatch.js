import React from 'react'
import s from './OptionColorTiles.module.scss'
import cn from 'classnames'
import { Button } from '@corratech/pylot-ui'

// eslint-disable-line
// @ts-ignore
export const VisualSwatch = (props) => {
    const swatchData = props.option.swatch_data
    let bgType
    if (swatchData.__typename === 'ImageSwatchData') {
        bgType = {
            backgroundImage: `url(${swatchData ? swatchData.thumbnail : ''})`
        }
    } else {
        bgType = {
            backgroundColor: swatchData.value
        }
    }
    return (
        <Button
            style={bgType}
            variant="link"
            title={props.option.label}
            className={
                //props.option.label === 'White'
                //    ? cn(s.visualSwatch, s.whiteSwatch)
                //    : cn(s.visualSwatch)
                cn(s['visual-swatch'])
            }
        />
    )
}
