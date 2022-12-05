import React, { VFC } from 'react'
import { SmartCaseScene } from './SmartCases.interfaces'
import Image from '@corratech/corsair-image'
import cn from 'classnames'
import s from './SmartCases.module.scss'

export const SmartCaseItem: VFC<{
    scene: SmartCaseScene
    active: boolean
    handleChangeScene: (scene: SmartCaseScene) => void
}> = ({ active, handleChangeScene, scene }) => {
    const { sceneImage, sceneName, sceneVideo, title } = scene

    return (
        <div
            onClick={() => handleChangeScene(scene)}
            onKeyPress={() => handleChangeScene(scene)}
            role="button"
            tabIndex={0}
            data-scene={sceneVideo.file.url}
            className={cn(
                s['smart-case-item-wrappper'],
                'w-1/2 cursor-pointer pt-0 md:mr-0 mr-6 md:pb-8 relative hover:opacity-100 md:mt-0 mt-3',
                {
                    'opacity-100': active,
                    'opacity-50': !active
                }
            )}
        >
            <div className="md:block hidden">
                <div className="rounded-lg">
                    <div
                        style={{
                            filter: active ? 'blur(20px)' : 'none'
                        }}
                        className="absolute z-0 w-full left-0  top-0"
                    >
                        <Image
                            src={sceneImage.file.url}
                            alt={title}
                            width={sceneImage.file.details.image.width}
                            height={sceneImage.file.details.image.height}
                        />
                    </div>
                </div>
                <div className="rounded-lg pb-2">
                    <Image
                        src={sceneImage.file.url}
                        alt={title}
                        width={sceneImage.file.details.image.width}
                        height={sceneImage.file.details.image.height}
                    />
                </div>
            </div>
            <div
                className={cn(
                    s['smart-case-item-mobile'],
                    'md:hidden block rounded-lg pb-2 w-full h-full relative'
                )}
            >
                <div
                    style={{
                        filter: active ? 'blur(5px)' : 'none',
                        background: `url(${scene.sceneImage.file.url})`,
                        minHeight: 60
                    }}
                    className="absolute rounded-lg z-0 w-full left-0  top-0"
                />
                <div
                    className="rounded-lg"
                    style={{
                        background: `url(${scene.sceneImage.file.url})`,
                        minHeight: 60
                    }}
                />
            </div>
            <p className="font-aktivGroteskBold text-white whitespace-no-wrap">
                {sceneName}
            </p>
        </div>
    )
}
