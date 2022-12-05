import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import { Banner23TileResponse, Banner23TileProps } from './types'

const Banner3Tile = dynamic(() => import('./Banner3Tile'))
const Banner2Tile = dynamic(() => import('./Banner2Tile'))
const BanneriCue = dynamic(() => import('./BanneriCue'))

const Banner23TileTypes: Record<string, ComponentType<Banner23TileResponse>> = {
    '3 Banners Row': Banner3Tile,
    '3 Banners Column': Banner3Tile,
    '2 Banners': Banner2Tile,
    '2 Banners 0.3 Width': BanneriCue
}

const Banner23Tile: React.FC<Banner23TileResponse> = ({ content }) => {
    const Component = Banner23TileTypes[`${content?.bannersType}`]

    return <Component content={content as Banner23TileProps} />
}

export default Banner23Tile
