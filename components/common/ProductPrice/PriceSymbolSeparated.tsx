/**
 * Currency symbol separated to span tag for styling
 * css ::first-letter causing issue in firefox which is known issue in firefox
 * https://bugzilla.mozilla.org/show_bug.cgi?id=597510
 * @param amount
 * @returns
 */
export const PriceSymbolSeparated = ({ amount }: { amount: string }) => {
    const regex = /^(\D*)(.*)/
    const splitSymbol = regex.exec(amount)

    if (!splitSymbol?.length) {
        return <span className="price-amount">{amount}</span>
    }

    return (
        <>
            <span className="price-symbol">{splitSymbol[1]}</span>
            <span className="price-amount">{splitSymbol[2]}</span>
        </>
    )
}
