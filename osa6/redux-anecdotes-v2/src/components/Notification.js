import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
    render() {
        const style = {
            border: 'solid',
            padding: 10,
            borderWidth: 1
        }
        const { notifications } = this.props
        return (
            <div style={style}>
                {notifications.message}
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        notifications: store.notifications
    }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
