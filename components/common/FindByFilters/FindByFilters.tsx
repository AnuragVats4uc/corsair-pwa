import React, { useState, VFC } from 'react'
import s from './FindByFilters.module.scss'
import { Dropdown } from '@corratech/pylot-dropdown'
import cn from 'classnames'
import Image from '@corratech/corsair-image'
import { useTranslation } from 'next-i18next'
import {
    FindByCompabilityContentful,
    FindByMotherboardsContentful
} from './types'
import {
    ApplyFilter,
    PLPManager
} from '@corratech/corsair-filters-and-sort/src/FilterTypes'
import { SearchCriteriaFilterActions } from '@corratech/corsair-filters-and-sort'

const c = {
    container: `${s.filtersContainer} mx-auto my-auto w-full flex place-content-between md-max:px-6 md-max:mb-4`,
    dropdownContainer: `${s['sort-label']} w-full relative z-1 flex items-center justify-center focus:outline-none`,
    dropdownItemSelect: `${s['sort-label-selected']} uppercase font-aktivGrotesk text-left w-full`,
    imageContainer: `relative mt-3 ${s.imageContainer}`,
    containerSelected: `md:w-6/12 relative ${s.borderSelected} before:absolute before:w-full before:v-full flex-row flex`,
    containerSelection: `md:w-6/12 relative ${s.borderSelection} flex-row flex`,
    titleSelection: `relative font-bebasNeue uppercase ${s.titleSelection}`,
    descriptionSelection: `relative font-aktivGrotesk mt-1 ${s.descriptionSelection}`,
    underline: `relative ${s.underline}`
}

interface FindByFiltersProps {
    plpManager: PLPManager
    categoryDataContentful: {
        parsedEntries: {
            filterByCompability: FindByCompabilityContentful
            filterByMotherboard: FindByMotherboardsContentful
        }
    }
}

const FindByFilters: VFC<FindByFiltersProps> = ({
    categoryDataContentful,
    plpManager
}): JSX.Element => {
    //Temporary variables/images, there is a future ticket to implement this section with contentful
    const { t } = useTranslation(['common', 'plp'])
    const [selectedSection, setSelectedSection] = useState(0)
    const [currentFocus, setCurrentFocus] = useState(0)

    if (
        !categoryDataContentful.parsedEntries ||
        !categoryDataContentful.parsedEntries?.filterByCompability?.desktop ||
        !categoryDataContentful.parsedEntries?.filterByMotherboard?.motherboards
    ) {
        return <div />
    }

    const applyFilter: ApplyFilter = (filterData) => {
        const $body: HTMLBodyElement | null = document.querySelector('body')

        if ($body) {
            $body.style.pointerEvents = 'none'
        }

        const newFilters = plpManager.plpState.appliedSearchCritieria.filter(
            (item) => item.attribute_code !== filterData?.requestVar
        )

        setTimeout(() => {
            plpManager.setSearchCriteria([
                ...newFilters,
                {
                    attribute_code: filterData?.requestVar as string,
                    filter_action: SearchCriteriaFilterActions.EQ,
                    filter_value: filterData?.value_string as string
                }
            ])
        }, 100)

        if ($body) {
            $body.style.pointerEvents = 'auto'
        }
    }

    const placeholderBySystem = '/images/memory-finder-placeholder-s.png'
    const placeholderByCompatibility = '/images/memory-finder-placeholder-c.png'
    const tempAlt = 'remove when connected for contentful'

    const {
        parsedEntries: {
            filterByCompability: { desktop, manufactures, models },
            filterByMotherboard: {
                motherboards,
                manufactures: manufacturesMotherboards
            }
        }
    } = categoryDataContentful

    const filterItems =
        selectedSection === 0
            ? [desktop, manufactures, models].filter(Boolean)
            : [motherboards, manufacturesMotherboards].filter(Boolean)

    const dropdownLabel = (isOpen: boolean, label: string) => (
        <button
            className={cn(c.dropdownContainer, {
                [s['sort-label-active']]: !isOpen
            })}
        >
            <span className={c.dropdownItemSelect}>{label}</span>
        </button>
    )

    const clearCurrentFilters = (currentFilters: number) => {
        setCurrentFocus(0)

        let attributes = ['Desktops', 'Manufactures', 'Models']

        if (currentFilters === 0) {
            attributes = ['Manufactures', 'Motherboards']
        }

        setTimeout(() => {
            const newFilters = plpManager.plpState.appliedSearchCritieria.filter(
                (item) => !attributes.includes(item.attribute_code)
            )

            plpManager.setSearchCriteria([...newFilters])
        }, 100)
    }

    return (
        <>
            <div className="md:flex md:flex-row md:justify-items-center mb-8 pt-6 gap-10">
                <div
                    role="presentation"
                    onKeyDown={() => {
                        setSelectedSection(0)
                        clearCurrentFilters(0)
                    }}
                    className={cn(
                        selectedSection === 0
                            ? c.containerSelected
                            : c.containerSelection,
                        'cursor-pointer'
                    )}
                    onClick={() => {
                        setSelectedSection(0)
                        clearCurrentFilters(0)
                    }}
                >
                    <div className="w-4/12 lg:w-5/12 xl:w-4/12">
                        <div className={c.imageContainer}>
                            <Image
                                alt={tempAlt}
                                src={placeholderBySystem}
                                layout="fill"
                            />
                        </div>
                    </div>
                    <div className="w-8/12 lg:w-7/12 xl:w-8/12 text-white justify-center md:h-full flex flex-col ml-3">
                        <p className={c.titleSelection}>
                            {t('Find by system')}
                        </p>
                        <p className={c.descriptionSelection}>
                            {t('Identify by your make and model')}
                        </p>
                        <div className={c.underline} />
                    </div>
                </div>
                <div
                    className={cn(
                        selectedSection === 1
                            ? c.containerSelected
                            : c.containerSelection,
                        'cursor-pointer'
                    )}
                    role="presentation"
                    onKeyDown={() => {
                        setSelectedSection(1)
                        clearCurrentFilters(1)
                    }}
                    onClick={() => {
                        setSelectedSection(1)
                        clearCurrentFilters(1)
                    }}
                >
                    <div className="w-4/12 lg:w-5/12 xl:w-4/12">
                        <div className={c.imageContainer}>
                            <Image
                                alt={tempAlt}
                                src={placeholderByCompatibility}
                                layout="fill"
                            />
                        </div>
                    </div>
                    <div className="w-8/12 lg:w-7/12 xl:w-8/12 text-white justify-center md:h-full flex flex-col ml-5">
                        <p className={c.titleSelection}>
                            {t('Find by motherboard')}
                        </p>
                        <p className={c.descriptionSelection}>
                            {t('Find your exact system board')}
                        </p>
                    </div>
                </div>
            </div>
            <div
                className={cn(
                    c.container,
                    selectedSection === 0 ? 'justify-between' : 'justify-start'
                )}
            >
                {filterItems.length > 0 &&
                    filterItems.map((filterItem, index) => {
                        const appliedValue = plpManager.plpState.appliedSearchCritieria.find(
                            (item) => item.attribute_code === filterItem.title
                        )

                        let selectedLabel = filterItem.title

                        if (appliedValue) {
                            const existsFilterSelected = filterItem.children.find(
                                (child) =>
                                    child.value === appliedValue.filter_value
                            )

                            if (existsFilterSelected) {
                                selectedLabel = existsFilterSelected.title
                            }
                        }

                        return (
                            <Dropdown
                                key={filterItem.title}
                                className={s['sort']}
                                onClick={() => {
                                    setCurrentFocus(index)
                                }}
                                wrapperClassName={cn(s['sort-container'], {
                                    [s['focused']]: index === currentFocus
                                })}
                                openedDisplay={dropdownLabel(
                                    false,
                                    selectedLabel
                                )}
                                closedDisplay={dropdownLabel(
                                    true,
                                    selectedLabel
                                )}
                            >
                                <ul>
                                    {filterItem.children.length
                                        ? filterItem.children.map((item) => (
                                              <li
                                                  role="presentation"
                                                  onKeyPress={() => {
                                                      applyFilter({
                                                          requestVar:
                                                              filterItem.title,
                                                          value_string:
                                                              item.value,
                                                          label:
                                                              filterItem.title
                                                      })
                                                  }}
                                                  className={cn(
                                                      s['sort-item'],

                                                      'block'
                                                  )}
                                                  key={item.value}
                                                  value={item.value}
                                                  onClick={() => {
                                                      applyFilter({
                                                          requestVar:
                                                              filterItem.title,
                                                          value_string:
                                                              item.value,
                                                          label:
                                                              filterItem.title
                                                      })
                                                  }}
                                              >
                                                  <span
                                                      className={
                                                          s['sort-item-anchor']
                                                      }
                                                  >
                                                      {item.title}
                                                  </span>
                                              </li>
                                          ))
                                        : null}
                                </ul>
                            </Dropdown>
                        )
                    })}
            </div>
        </>
    )
}

export default FindByFilters
