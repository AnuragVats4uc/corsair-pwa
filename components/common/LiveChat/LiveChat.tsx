import React from 'react'
import { useStoreConfig } from 'config'
import Script from 'next/script'

declare global {
    interface Window {
        zESettings?: Record<string, unknown>
    }
}

export const LiveChat = (): JSX.Element | null => {
    const {
        base: {
            liveChat: { enabled, key, settings }
        }
    } = useStoreConfig()

    const setSettings = () => {
        if (typeof window !== undefined && settings && !window.zESettings) {
            window.zESettings = settings
        }
    }

    return enabled ? (
        <Script
            id="ze-snippet"
            src={`https://static.zdassets.com/ekr/snippet.js?key=${key}`}
            onLoad={setSettings}
        />
    ) : null
}
