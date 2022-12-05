import { useEffect } from 'react'
import { useUI } from '@corratech/pylot-ui/context'

function useOutsideRef(ref: { current: HTMLDivElement | null }) {
    const { closeSearch, displaySearch } = useUI()
    useEffect(() => {
        const handleClickOutsideSb = (e: any): void => {
            if (ref.current && !ref.current.contains(e.target)) {
                if (displaySearch) closeSearch()
            }
        }

        document.addEventListener('mousedown', handleClickOutsideSb)
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideSb)
        }
    }, [ref])
}

export default useOutsideRef
