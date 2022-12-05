import { JsCssScript } from '@components/common/types'
import { useEffect } from 'react'

export type ScriptElt = HTMLScriptElement | null

export const useScript = (linkedJS: JsCssScript[] | undefined) => {
    useEffect(() => {
        if (!linkedJS?.length || typeof window === 'undefined') return

        linkedJS?.forEach((data) => {
            if (!data?.linkedJs?.length || typeof window === 'undefined') return
            data?.linkedJs?.forEach((url) => {
                let script: ScriptElt = document.querySelector(
                    `script[src="${url}"]`
                )
                if (!script) {
                    script = document.createElement('script')
                    script.src = url
                    script.async = false //intentionally keeping as false to maintain the order of execution
                    script.setAttribute('data-status', 'loading')
                    document.body.appendChild(script)
                }
            })
        })
    }, [linkedJS])
}
