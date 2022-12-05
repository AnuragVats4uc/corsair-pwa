import { Button } from '@corratech/pylot-ui'
import cn from 'classnames'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import s from './OptionColorTiles.module.scss'
import { VisualSwatch } from './VisualSwatch'

export const OptionColorTiles = ({
    configurable_option,
    handleVariantChange,
    showText = false,
    restriction,
    productLink
}) => {
    const [selected, setSelected] = useState(-1)

    if (Object.entries(configurable_option).length === 0) {
        return null
    }

    return (
        <ul
            key={configurable_option.id}
            className={cn(
                configurable_option.attribute_code,
                s.optionColorTiles
            )}
        >
            {configurable_option.values.map((option, index) => {
                const selIndex =
                    selected == -1 && option.preselect ? index : selected
                const hasSwatch = option.swatch_data != null
                const handleClick = () => {
                    setSelected(index)
                    handleVariantChange(option)
                }

                if (restriction < 0 || index >= restriction) return null

                return (
                    <li
                        className={`${selIndex === index ? s.selected : ''}`}
                        key={option.label}
                    >
                        <Button
                            variant="link"
                            onClick={handleClick}
                            onMouseEnter={handleClick}
                            className="hover:outline-none"
                        >
                            {hasSwatch && <VisualSwatch option={option} />}
                            {showText ? option.label : null}
                        </Button>
                    </li>
                )
            })}
            {restriction > 0 &&
                configurable_option.values.length > restriction && (
                    <a href={productLink ? productLink : '#'}>
                        + {configurable_option.values.length - restriction}
                    </a>
                )}
        </ul>
    )
}

OptionColorTiles.propTypes = {
    configurable_option: PropTypes.object.isRequired,
    handleVariantChange: PropTypes.func.isRequired,
    showText: PropTypes.bool,
    restriction: PropTypes.number
}

OptionColorTiles.defaultProps = {
    restriction: 0
}
