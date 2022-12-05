import { useStoreConfig } from '@config/index'
import { CountryCodeEnum } from '@pylot-data/enums/CountryCodeEnum'
import { useCallback } from 'react'

export interface AddressInputVariableInterface {
    'street[0]': string
    'street[1]': string
    city: string
    company: string
    country_code: CountryCodeEnum
    default_billing: boolean
    default_shipping: boolean
    firstname: string
    lastname: string
    postcode: string
    region: string
    street: string[]
    telephone: string
}

export type MelissaData = {
    RecordID: string
    Results: string
    FormattedAddress: string
    Organization: string
    AddressLine1: string
    AddressLine2?: string
    AddressLine3?: string
    AddressLine4?: string
    AddressLine5?: string
    AddressLine6?: string
    AddressLine7?: string
    AddressLine8?: string
    SubPremises: string
    DoubleDependentLocality: string
    DependentLocality: string
    Locality: string
    SubAdministrativeArea: string
    AdministrativeArea: string
    PostalCode: string
    PostalCodeType: 'P' | 'M' | 'U' | 'Empty'
    AddressType: string
    AddressKey: string
    SubNationalArea: string
    CountryName: string
    CountryISO3166_1_Alpha2: string
    CountryISO3166_1_Alpha3: string
    CountryISO3166_1_Numeric: string
    CountrySubdivisionCode: string
    Thoroughfare: string
    ThoroughfarePreDirection: string
    ThoroughfareLeadingType: string
    ThoroughfareName: string
    ThoroughfareTrailingType: string
    ThoroughfarePostDirection: string
    DependentThoroughfare: string
    DependentThoroughfarePreDirection: string
    DependentThoroughfareLeadingType: string
    DependentThoroughfareName: string
    DependentThoroughfareTrailingType: string
    DependentThoroughfarePostDirection: string
    Building: string
    PremisesType: string
    PremisesNumber: '711-2880'
    SubPremisesType: string
    SubPremisesNumber: string
    PostBox: string
    Latitude: string
    Longitude: string
    DeliveryIndicator: 'R' | 'B' | 'U'
    MelissaAddressKey: string
    MelissaAddressKeyBase: string
    PostOfficeLocation: string
    SubPremiseLevel: string
    SubPremiseLevelType: string
    SubPremiseLevelNumber: string
    SubBuilding: string
    SubBuildingType: string
    SubBuildingNumber: string
    UTC: string
    DST: string
    DeliveryPointSuffix: string
    CensusKey: string
    Extras: any
}

const formatUrlParameter = (value: string) => value.replace(/\s/g, '+')

export const useAddressValidation = () => {
    const config = useStoreConfig()

    const melissaApiKey = config.base.melissa?.apiKey
    const melissaUrl =
        'https://address.melissadata.net/V3/WEB/GlobalAddress/doGlobalAddress'

    /**
     * Melissa Rquest
     * @description request sent to Melissa API to get suggested addresses
     * @param input type AddressInputVariableInterface response from address update
     * @returns Melissa JSON address data
     */
    const requestMelissaData = async (
        input: AddressInputVariableInterface
    ): Promise<MelissaData> => {
        const { country_code: countryCode, postcode, street } = input

        let melissaRequestUrl = `${melissaUrl}?id=${melissaApiKey}`

        if (countryCode)
            melissaRequestUrl += `&ctry=${formatUrlParameter(countryCode)}`

        if (street) melissaRequestUrl += `&a1=${formatUrlParameter(street[0])}`

        if (postcode)
            melissaRequestUrl += `&postal=${formatUrlParameter(postcode)}`

        melissaRequestUrl += '&format=JSON'

        const response = await fetch(melissaRequestUrl).then((response) =>
            response.json()
        )

        return response?.Records?.[0]
    }

    /**
     * Verify Address Accuracy
     * @description https://www.melissa.com/quickstart-guides/global-address
     * @description `Interpreting Results` for other AV codes
     * @param results array of strings - results codes from Melissa API
     * @returns boolean
     */
    const verifyAddressAccuracy = (results: any) => {
        if (!results || !results.length) return false

        const resultsArray = results.split(',')
        const successfulResultKeys = [
            'AV25',
            'AV24',
            'AV23',
            'AV14',
            'AV13',
            'AV22'
        ]

        return resultsArray.some((element: string) =>
            successfulResultKeys.includes(element)
        )
    }

    /**
     * Validate Excluded Addresses
     * @description checks to see if address line 1 has string 'PO Box', 'APO', or 'FPO'
     * @param input type AddressInputVariableInterface response from address update
     * @returns boolean
     */
    const validateExcludedAddresses = (
        input: AddressInputVariableInterface
    ) => {
        const { street } = input
        const invalidAddresses = ['apo', 'fpo', 'po box']

        return invalidAddresses.some((element) =>
            street[0].toLowerCase().includes(element)
        )
    }

    /**
     * Adds / Updates necessary Melissa data to update address
     * @param melissaData Melissa API response
     * @param input User input from address edit form
     * @returns updatedInput object
     */
    const transformMelissaData = (
        melissaData: MelissaData,
        input: AddressInputVariableInterface
    ) => {
        const updatedInput = { ...input }

        updatedInput.street[0] = melissaData.AddressLine1
        updatedInput.postcode = melissaData.PostalCode
        updatedInput.city = melissaData.Locality
        updatedInput.region = melissaData.AdministrativeArea

        return updatedInput
    }

    const isMilitaryAddress = useCallback((postalCodeType) => {
        return postalCodeType === 'M'
    }, [])

    return {
        requestMelissaData,
        transformMelissaData,
        validateExcludedAddresses,
        verifyAddressAccuracy,
        isMilitaryAddress
    }
}
