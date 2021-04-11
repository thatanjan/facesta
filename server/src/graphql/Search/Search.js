import merge from 'lodash/merge'

import searchUser from './searchUser'
import searchTypes from './SearchTypes'

export const SearchTypeDefs = [searchTypes]

export const SearchResolvers = merge(searchUser)
