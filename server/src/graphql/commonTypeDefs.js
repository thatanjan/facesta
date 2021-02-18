import { gql } from 'apollo-server-express'
import { ERROR_MESSAGE, MESSAGE } from 'variables/global'

const types = gql`
  type Error {
    ${ERROR_MESSAGE}: String! 
  }

  type Message {
    ${MESSAGE}: String! 
  }

  union ErrorOrMessage = Error | Message
  
`

export default types
