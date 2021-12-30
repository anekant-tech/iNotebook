import React from 'react'

function Alert(props) {
    return (
        <div>
            <div>
            <div class="alert alert-primary" role="alert">
                {props.message}
            </div>
        </div>
        </div>
    )
}

export default Alert
