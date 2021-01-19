import React from 'react'
import PropTypes from "prop-types"

const LoginForm = ({
    handleLogin,
    username,
    password
}) => {
    return (
        <div>

            <form onSubmit={handleLogin}>
                <div>
                    username {' '}
                    <input
                        {...username}
                        reset=''
                    />
                </div>

                <div>
                    password {' '}
                    <input

                        {...password}
                        reset=''
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}
LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.object.isRequired,
    password: PropTypes.object.isRequired
}
export default LoginForm