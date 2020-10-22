import Validator from 'validator'
import is_empty from './is_empty'

export interface validator_data {
  name: string
}

interface error_data {
  name?: string
}

const validate_register_input = (data: validator_data) => {
  let errors: error_data = {}

  if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = 'Name must be between 2 and 30'
  }

  return {
    errors,
    isValid: is_empty(errors),
  }
}

export default validate_register_input
