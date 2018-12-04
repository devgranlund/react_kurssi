import React from 'react'

class Notification extends React.Component {
    render() {
        const style = {
            border: 'solid',
            padding: 10,
            borderWidth: 1
        }
        const notifications = this.props.store.getState().notifications
        return (
            <div style={style}>
                {notifications.message}
            </div>
        )
    }
}

export default Notification
