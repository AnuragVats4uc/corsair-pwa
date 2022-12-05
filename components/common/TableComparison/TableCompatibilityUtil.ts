import { rightTick, closeIcon } from './TableComparisionIcons'

import s from './TableComparison.module.scss'

export const spanRegex = /<td>(([0-9A-Za-z\s])*){{(rowspan|colspan)_([1-9]+)}}\s*<\/td>/
export const headingRegex = /<td>(([0-9A-Za-z\s])*){{heading}}\s*<\/td>/
export const textBoxRegex = /<td>(([0-9A-Za-z\s/])*){{text_box}}(([0-9A-Za-z\s/])*)<\/td>/
export const edgeRowRegex = /<td>(([0-9A-Za-z\s/])*){{edge_row}}\s*<\/td>/

export const rightTickRegex = /<td>(([0-9A-Za-z\s/])*){{right_tick}}\s*<\/td>/
export const closeIconRegex = /<td>(([0-9A-Za-z\s/])*){{close_icon}}\s*<\/td>/
export const notApplicableRegex = /<td>(([0-9A-Za-z\s/])*)\s*{{N\/A}}\s*<\/td>/

export const createSpan = (table: string): string => {
    const data = spanRegex.exec(table)

    return data
        ? `<td class="${s[data[3]]}" ${data[3]}="${data[4]}"><span>${
              data[1]
          }</span></td>`
        : ''
}

export const createHeading = (table: string): string => {
    const data = headingRegex.exec(table)

    return data
        ? `<th class="${s['table-heading']}"><span>${data[1]}</span></th>`
        : ''
}

export const createTextBox = (table: string): string => {
    const data = textBoxRegex.exec(table)

    return data
        ? `<td class="${s['text-box']}">${
              data[1] && `<span>${data[1]}</span>`
          }<span><label>${data[3]}</label></span></td>`
        : ''
}

export const createEdgeRowCell = (table: string): string => {
    const data = edgeRowRegex.exec(table)

    return data
        ? `<td class="${s['edge-row-cell']}"><span>${data[1]}</span></td>`
        : ''
}

export const createRightTick = (table: string): string => {
    const data = rightTickRegex.exec(table)

    return data
        ? `<td class="${s['right-tick']}">${
              data[1] && `<span>${data[1]}</span>`
          }<span>${rightTick}</span></td>`
        : ''
}

export const createCloseIcon = (table: string): string => {
    const data = closeIconRegex.exec(table)

    return data
        ? `<td class="${s['close-icon']}">${
              data[1] && `<span>${data[1]}</span>`
          }<span>${closeIcon}</span></td>`
        : ''
}

export const createNotApplicable = (table: string): string => {
    const data = notApplicableRegex.exec(table)

    return data
        ? `<td class="${s['not-applicable']}">${
              data[1] && `<span>${data[1]}</span>`
          }<span>N/A</span></td>`
        : ''
}

export const regexFunctionPair = [
    {
        regex: spanRegex,
        func: createSpan
    },
    {
        regex: headingRegex,
        func: createHeading
    },
    {
        regex: textBoxRegex,
        func: createTextBox
    },
    {
        regex: edgeRowRegex,
        func: createEdgeRowCell
    },
    {
        regex: rightTickRegex,
        func: createRightTick
    },
    {
        regex: closeIconRegex,
        func: createCloseIcon
    },
    {
        regex: notApplicableRegex,
        func: createNotApplicable
    }
]

/**
 * This function takes the table string which comes from contentful and replaces the keywords in the table with respective html using the above functions.
 * @param table {String}
 * @returns string
 */
export const replaceWithRegex = (table: string): string => {
    regexFunctionPair.forEach((element) => {
        table?.match(new RegExp(element.regex, 'g'))?.forEach(() => {
            table = table.replace(element.regex, element.func(table))
        })
    })

    return table
}
