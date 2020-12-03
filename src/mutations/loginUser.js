import { generateToken, findUser, matchPasswords } from 'utils/authentication'
import LoginType from 'types/loginType'

import { authArguments } from 'utils/authentication'

const loginUser = {
    type: LoginType,
    args: authArguments(),
    resolve: (parent, { email, password }) => {
        return findUser(email)
            .catch((err) => console.log(err))
            .then((user) =>
                matchPasswords({
                    plainPassword: password,
                    hashedPassword: user.password,
                })
                    .then(() => ({
                        token: generateToken(user),
                        success: true,
                    }))
                    .catch((err) => console.log(err))
            )
    },
}

export default loginUser
