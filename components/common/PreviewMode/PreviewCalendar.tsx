import React, { FC, useState } from 'react'
import s from './PreviewCalendar.module.scss'

// currentDate is the fallback/default if no date exists in local storage
export const currentdate = new Date().getTime()

const c /*tw*/ = {
    previewCalendarContainer: `${s.previewCalendarContainer} bg-white text-black w-full flex flex-col justify-center`,
    previewCalendarLabel: `${s.previewCalendarLabel} flex h-10 justify-center w-full`,
    previewCalendarP: `${s.previewCalendarP} flex flex-col justify-center w-full bg-yellow text-black py-1 rounded-md`,
    btnApply: `${s.btnApply} cursor-pointer`
}

export const PreviewCalendar: FC = () => {
    const previewDateButton = 'Apply Preview Date Change'
    // We need slice 0,16 because the dates coming from Contentful only go to minutes. Any more or less on this value will cause the html calendar not be synchronized and break the functionality
    const dateNow = new Date().toISOString().slice(0, 16)
    const [calendarDate, setCalendarDate] = useState(dateNow)
    const [loading, setLoading] = useState(false)
    const loadingMessage = 'Loading Date Change...'

    if (typeof window !== 'undefined') {
        // receiving a string of epoch time and converting that to a readable date for html input
        const localStoragePreviewDate =
            window.localStorage.getItem('previewDate') || currentdate
        const numberPreviewDate = Number(localStoragePreviewDate)
        const calendarPreviewDate = new Date(numberPreviewDate)
            .toISOString()
            .slice(0, 16)
        setCalendarDate(calendarPreviewDate)
    }

    /**
     * JSX component that fetches previewDate
     * @returns JSX element
     */
    const ApplyButton = () => {
        /**
         * Handles apply date change click for preview
         */
        const handleApplyDateChangeClick = () => {
            if (typeof window !== 'undefined') {
                const preview = window.localStorage.getItem('isPreview')

                if (preview === 'true') {
                    const previewDate = window.localStorage.getItem(
                        'previewDate'
                    )
                    if (previewDate) fetchPreviewDate(previewDate)
                }
            }
        }
        /**
         * Fetching the preview date in this button to give up-to-date information to our [product_slug]
         */
        const fetchPreviewDate = (previewDate: string) => {
            return fetch(`/api/preview?time=${previewDate}`, {
                headers: { preview: 'true' }
            }).then(() => {
                window.location.reload()
                setLoading(true)
            })
        }
        return (
            <button
                className={s.btnApply}
                onClick={() => handleApplyDateChangeClick()}
            >
                {previewDateButton}
            </button>
        )
    }

    return (
        <div className={c.previewCalendarContainer}>
            <label className={c.previewCalendarLabel}>
                <input
                    type="datetime-local"
                    min="2000-01-01T00:00"
                    max="2050-12-31T23:59"
                    value={calendarDate}
                    // previewDate exists in local storage
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        window.localStorage.setItem(
                            'previewDate',
                            e.target.valueAsNumber.toString()
                        )
                    }}
                />
            </label>
            <p className={c.previewCalendarP}>
                {loading ? <div>{loadingMessage}</div> : <ApplyButton />}
            </p>
        </div>
    )
}
