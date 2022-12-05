import { getStoreConfig } from '@config/hooks/useStoreConfig'

//Validating the brand urls regardless of www
export const canRedirectWithMultipass = (url: string) => {
    const config = getStoreConfig()
    const brandStores = config.base.brands

    return brandStores.some((brandStore) => {
        return getHostName(url) === getHostName(brandStore)
    })
}

const getHostName = (url: string) => {
    const regex = /(?:https?:\/\/)(?:www\.)?([a-zA-Z]+).*/gm
    const domain = regex.exec(url)
    if (domain && domain.length > 1) {
        return domain[1]
    }
    return url
}
