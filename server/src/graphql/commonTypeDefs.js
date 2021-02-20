import { gql } from 'apollo-server-express'
import { ERROR_MESSAGE, MESSAGE } from 'variables/global'
import { ERROR_OR_MESSAGE_TYPE } from 'variables/commonText'

const types = gql`
  type Error {
    ${ERROR_MESSAGE}: String! 
  }

  type Message {
    ${MESSAGE}: String! 
  }


  type ErrorOrMessage {
    ${ERROR_OR_MESSAGE_TYPE} 
  }
  
`

export default types
