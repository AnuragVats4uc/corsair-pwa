import { RibbonData } from '@components/common/types'
import { useEffect, useState } from 'react'

let listeners: [(state: RibbonData | undefined) => void]
let state: RibbonData | undefined

const setState = (newState: RibbonData[] | undefined) => {
    if (!newState) return

    const ribbonState = newState?.find((currentRibbon) => currentRibbon.active)

    if (!ribbonState) return null

    state = { ...ribbonState }
    listeners?.forEach((listener) => listener(state))
}

export const useRibbon = (): [
    RibbonData | undefined,
    (state: RibbonData[] | undefined) => void
] => {
    const newListener = useState<RibbonData | undefined>()[1]

    useEffect(() => {
        listeners?.push(newListener)

        return () => {
            listeners?.pop()
        }
    }, [newListener])

    return [state, setState]
}
