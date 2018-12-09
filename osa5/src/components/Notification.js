import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
    render() {
        const { message, cssClass } = this.props
        return (
            <div className={cssClass}>
                {message}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.notification.message,
        cssClass: state.notification.cssClass
    }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification