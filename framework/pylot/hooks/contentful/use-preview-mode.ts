interface previewModeReturn {
    previewMode: () => boolean
}

export const usePreviewMode = (): previewModeReturn => {
    if (typeof window !== 'undefined') {
        const isPreview = window.location.hostname
            .toLowerCase()
            .includes('preview')
        if (isPreview === true) {
            window.localStorage.setItem('isPreview', isPreview.toString())
        } else {
            window.localStorage.removeItem('isPreview')
        }
    }
    return {
        previewMode: () => {
            if (typeof window !== 'undefined') {
                const isPreview = window.localStorage.getItem('isPreview')

                return isPreview === 'true'
            }
            return false
        }
    }
}
