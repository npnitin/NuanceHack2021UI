import React, { Component } from 'react'

class Entity extends Component {
    render() {
        const{entity} = this.props;
        return (
            <div>
                {entity.text} of type{entity.category}
            </div>
        )
    }
}
export default Entity;