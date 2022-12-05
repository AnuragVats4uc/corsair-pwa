const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en-US'

class Backend {
    static type = 'backend'
    init = async () => {
        // ESM module doesn't allow importing on the top level
        const { default: getTranslation } = await import(
            './framework/pylot/api/operations/get-translation'
        )
        this.getTranslation = getTranslation
    }
    /**
     * callback: (translationData: JSON | Error message, retry: boolean) => {}
     *
     * @param locale
     * @param namespace
     * @param callback
     * @returns {Promise<void>}
     */
    read = async (locale = defaultLocale, namespace = 'common', callback) => {
        try {
            // Set default region for all the locales, as translations are the same everywhere
            const defaultLocaleParts = defaultLocale?.split('-')
            const localeParts = locale.split('-')
            locale = `${localeParts[0]}-${defaultLocaleParts?.[1]}`

            // Ensure that locale loader is available
            if (!this.getTranslation) {
                await this.init()
            }

            const translationData = await this.getTranslation(
                [namespace],
                locale
            )

            if (translationData?.errors?.length) {
                callback(translationData.errors[0].message, null)
                return
            }
            if (!translationData?.data.translation?.length) {
                callback(
                    `Unable to load namespace ${namespace} for locale ${locale}`,
                    null
                )
                return
            }

            callback(
                null,
                JSON.parse(translationData?.data.translation[0]?.entries)
            )
        } catch (e) {
            console.error(e)
            callback(null, false)
        }
    }
}

module.exports = Backend
