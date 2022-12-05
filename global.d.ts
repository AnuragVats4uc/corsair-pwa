// Declarations for modules without types
declare let gigya: IGigya
declare module 'next-themes'
declare module 'react-prismazoom'

declare let sjcl: any // will remove when pylot multipass is completed
interface IGigya {
    accounts: {
        addEventHandlers: (params: AddEventHandlersParams) => void
        showScreenSet: (params: ShowScreenSetParams) => void
        hideScreenSet: (params: ShowScreenSetParams) => void
        logout: (params: uid) => void
    }
}

type GigyaEventObjects = {
    field: string
    value: boolean
}

interface ShowScreenSetParams {
    screenSet?: string
    startScreen?: string
    containerID?: string
    onFieldChanged?: (events: GigyaEventObjects) => void
}
