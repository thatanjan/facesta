import { gql } from 'apollo-server-express'
import {
	ERROR_MESSAGE,
	MESSAGE,
	POST_ID_TYPE,
	POST_OWNER_ID_TYPE,
} from 'variables/global'

const types = gql`
  type Error {
    ${ERROR_MESSAGE}: String! 
  }

  type Message {
    ${MESSAGE}: String! 
  }

`

export default types
