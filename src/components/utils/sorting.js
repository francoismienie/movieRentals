import _ from 'lodash'

export const sorting = (items, column, sortDirection) => {
    return _.orderBy(items,[column],sortDirection)
    
}