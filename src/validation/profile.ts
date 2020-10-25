import Validator from 'validator'
import is_empty from './is_empty'

import { socials } from '../routes/api/profile'

export interface validator_data {
    handle: string
    status: string
    skills: string
    website: string
    youtube: string
    twitter: string
    linkedin: string
    facebook: string
    instagram: string
}

interface error_data {
    handle?: string
    skills?: string
    website?: string
    youtube?: string
    twitter?: string
    linkedin?: string
    facebook?: string
    instagram?: string
}

const validate_profile_input = (data: validator_data) => {
    // the error object
    let errors: error_data = {}

    const validator_properties: string[] = [
        'handle',
        'status',
        'skills',
        'website',
        'youtube',
        'twitter',
        'linkedin',
        'facebook',
        'instagram',
    ]

    // if the property is empty then turn into empty string otherwise no change.
    for (const property of validator_properties) {
        data[property as keyof validator_data] = !is_empty(
            data[property as keyof validator_data]
        )
            ? data[property as keyof validator_data]
            : ''
    }

    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'handle needs to be 2 and 4 characters'
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required'
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills fileld is required'
    }

    if (!is_empty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = 'not a valid url'
        }
    }

    socials.forEach((item: string) => {
        if (!is_empty(data[item as keyof validator_data])) {
            if (!Validator.isURL(data[item as keyof validator_data])) {
                errors[item as keyof error_data] = 'not a valid url'
            }
        }
    })

    return {
        errors,
        isValid: is_empty(errors),
    }
}

export default validate_profile_input
