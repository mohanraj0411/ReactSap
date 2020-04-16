import React, { Component } from 'react';
import ListItem from "./ListItem";

export default class PersonalExpanses extends Component {
    render() {
        const { incomes, onDeleteClick } = this.props
        return (
            <ul className="list-group">
                {
                    incomes.length 
                    ?
                        <ListItem items={incomes} onDelete={onDeleteClick}></ListItem>
                    :
                    <li className="list-group-item text-center"><p>Add incomes or expances</p></li>
                }
            </ul>
        )

    }
}
