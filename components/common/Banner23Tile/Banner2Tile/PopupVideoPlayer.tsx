import React, { FC } from 'react'
import { PopupVideoPlayerProps } from '../types'

import s from './Banner2Tile.module.scss'

export const PopupVideoPlayer: FC<PopupVideoPlayerProps> = ({ videourl }) => {
    return (
        <div className={s['popupiframe']}>
            <iframe
                className="iframe"
                title="PopupVideo"
                src={videourl}
                style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    border: '0'
                }}
                allowFullScreen
            />
        </div>
    )
}
