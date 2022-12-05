import React from 'react'
import { SmartCaseScene } from './SmartCases.interfaces'
import cn from 'classnames'
export interface SmartCasesVideoProps {
    scenes: SmartCaseScene[]
    activeScene: SmartCaseScene | null
    showScene: boolean
}

const SmartCasesVideo = ({
    scenes,
    activeScene,
    showScene
}: SmartCasesVideoProps): JSX.Element => {
    const videos = scenes.map((scene) => (
        <video
            key={scene.title}
            src={scene.sceneVideo.file.url}
            autoPlay
            loop
            muted
            playsInline
            className={cn(
                'absolute left-0 h-full object-cover top-0 w-full z-10 opacity-0',
                {
                    'opacity-100':
                        activeScene?.title === scene.title && showScene
                }
            )}
        />
    ))

    return (
        <div className="absolute overflow-hidden left-0 top-0 w-full h-screen">
            {videos}
        </div>
    )
}

export default React.memo(SmartCasesVideo)
