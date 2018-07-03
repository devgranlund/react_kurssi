import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, cssClass }) => {
    if (message === null) {
        return null
    }
    return (
        <div className={cssClass}>
            {message}
        </div>
    )
}

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    cssClass: PropTypes.string.isRequired
}

export default Notification