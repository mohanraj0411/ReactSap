import React, { Component } from 'react'
import ListItemGroupContent from './ListItemGroupContent'

export default class ListItem extends Component {
    render() {
        const { items, onDelete } = this.props
        return (
            (items).map((item, key) => {
                return (
                <li className="list-group-item" key={key}>
                        <ListItemGroupContent content={item} onDelete={() => { console.log(item); onDelete(item) }}></ListItemGroupContent>
                </li>
                )
            })
        )
    }
}
