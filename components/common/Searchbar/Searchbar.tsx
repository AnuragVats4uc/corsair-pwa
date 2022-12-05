import { FC, useEffect, useMemo, useState } from 'react'
import cn from 'classnames'
import s from './Searchbar.module.scss'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import SearchAutocomplete from '../SearchAutocomplete'
import { Button } from '@corratech/pylot-ui'
import { useUI } from '@corratech/pylot-ui/context'
import { Cross, AppBarSearch, SearchDelete } from '@components/icons'

const searchPageURL = `/search`
interface Props {
    className?: string
    id?: string
}

const Searchbar: FC<Props> = ({ className, id = 'search' }) => {
    const router = useRouter()
    const { t } = useTranslation('common')
    const [searchTerm, setSearchTerm] = useState<string | undefined>(
        router.query.q as string | undefined
    )
    const [showAutoComplete, setShowAutoComplete] = useState<boolean>(true)
    const { closeSearch, displaySearch } = useUI()
    const fillColor = '#B3B3B3'
    useEffect(() => {
        router.prefetch(searchPageURL)

        router.events.on('routeChangeStart', closeSearch)

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off('routeChangeStart', closeSearch)
        }
    }, [])

    const handleMobileBackspace = () => {
        setSearchTerm('')
    }

    return useMemo(
        () => (
            <div className={cn(s['searchbar-main'], 'h-full')}>
                <div
                    className={cn(
                        s['input-container'],
                        'md:relative items-center h-full shadow-lg flex-col flex-no-wrap mx-2.5 my-auto md:mx-0 md:my-2.5',
                        {
                            hidden: !displaySearch,
                            flex: displaySearch
                        }
                    )}
                >
                    <div
                        className={cn(
                            s['label-container'],
                            'w-full flex flex-no-wrap items-center justify-evenly m-0 p-0'
                        )}
                    >
                        <Button
                            variant="link"
                            disabled={!!searchTerm?.length && !showAutoComplete}
                            className="flex items-center justify-center z-100"
                            onClick={() => {
                                router.push(
                                    {
                                        pathname: searchPageURL,
                                        query: searchTerm
                                            ? { q: searchTerm }
                                            : {}
                                    },
                                    undefined,
                                    { shallow: true }
                                )
                                setShowAutoComplete(false)
                            }}
                        >
                            <AppBarSearch fill={fillColor} height="40px" />
                        </Button>
                        <input
                            className={cn(
                                s['input'],
                                'appearance-none w-full text-white'
                            )}
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                            }}
                            onFocus={() => {
                                setShowAutoComplete(true)
                            }}
                            placeholder={t('Search')}
                            defaultValue={router.query.q}
                            value={searchTerm ?? router.query.q}
                            autoComplete="off"
                            onKeyUp={(e) => {
                                e.preventDefault()
                                if (e.key === 'Enter') {
                                    const q = e.currentTarget.value.trim()

                                    q.length > 1 &&
                                        router.push(
                                            {
                                                pathname: searchPageURL,
                                                query: q ? { q } : {}
                                            },
                                            undefined,
                                            { shallow: true }
                                        )
                                    setShowAutoComplete(false)
                                }
                            }}
                        />
                        <SearchDelete
                            width="32"
                            height="32"
                            className="flex md:hidden mr-4"
                            color={fillColor}
                            onClick={handleMobileBackspace}
                        />
                        <Button
                            className={cn(
                                s['x-icon-container'],
                                'h-full rounded-none'
                            )}
                            variant="link"
                            onClick={closeSearch}
                        >
                            <Cross
                                className={cn(s['x-icon'], 'mx-2 h-full')}
                                height="24"
                            />
                        </Button>
                    </div>
                    {!!searchTerm?.length &&
                        showAutoComplete === true &&
                        displaySearch && (
                            <SearchAutocomplete
                                searchTerm={searchTerm}
                                searchPageURL={searchPageURL}
                            />
                        )}
                </div>
            </div>
        ),
        [searchTerm, showAutoComplete, displaySearch]
    )
}

export default Searchbar
