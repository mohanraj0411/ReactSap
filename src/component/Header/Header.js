import React, { Component } from 'react';

export class Header extends Component {
    render() {
        const { incomes } = this.props
        let totalIncome = 0, totalSpending = 0;
        incomes.forEach(function (data) {
            if (data.type === 'income') { 
                totalIncome = totalIncome + Number(data.amount); 
            } else { 
                totalSpending = totalSpending + Number(data.amount);
            }
        });
        return (
            <div className="card bg-light">
                <div className="card-body">
                    <p className="card-text">Balance</p>
                    <h5 className="card-title">{totalIncome - totalSpending} CZK</h5>
                    <p className="card-text d-inline text-success pr-3">Income: {totalIncome} Kc</p>
                    <p className="card-text d-inline text-danger">Spendings: {totalSpending} Kc</p>
                </div>
            </div>
        )
    }
}

export default Header
