import React, { Component } from 'react';
import Header from './component/Header/Header'
import PersonalExpanses from './component/PersonalExpanses/PersonalExpanses'
import ModalPopup from './component/modal/ModalPopup'

class App extends Component {
  constructor(props) {
    super(props);
    this.editItem = {};

    let initialIncome = JSON.parse(localStorage.getItem('incomes'));
    this.state = { 
      incomes: initialIncome || []
    };
  }

  componentDidUpdate() {
    this._updateIncomeStorage();
  }

  _updateIncomeStorage = () => {
    let data = JSON.stringify(this.state.incomes);
    localStorage.setItem('incomes', data);
  }
  
  addIncome = (item) => {
    this.editItem = item || { note: "", date: "", amount: "", type: "income" };
    this.refs.incomeModal.openModal();
    this.forceUpdate();
  }

  addExpanse = (item) => {
    this.editItem = item || { note: "", date: "", amount: "", type: "expanse" };
    this.refs.expanseModal.openModal();
    this.forceUpdate();
  }

  saveIncome = (item) => {
    this.setState({
      incomes:
        (!item.id) ? this.state.incomes.concat({ ...item, id: Date.now() }) :
          this.state.incomes.map((el) => {
            if (el.id === item.id) {
              el.note = item.note;
              el.date = item.date;
              el.amount = item.amount;
              el.type = item.type
            }
            return el;
          }
          )
    })
  }

  deleteRecipe = (item) => {
    this.setState({ incomes: this.state.incomes.filter((el) => el.id !== item.id) });
  }

  render() {
    return (
      <div className="d-flex flex-column vh-100">
        <main className="flex-shrink-0">
          <Header incomes={this.state.incomes} spending={this.state.spending} />
          <PersonalExpanses incomes={this.state.incomes} spending={this.state.spending} onDeleteClick={this.deleteRecipe} />
        </main>
        <footer className="footer mt-auto py-3">
          <div className="d-flex justify-content-center">
            <input type="button" className="btn btn-success mr-2" onClick={this.addIncome} value="Add income" />
            <input type="button" className="btn btn-danger ml-2" onClick={this.addExpanse} value="Add Spending" />
          </div>
        </footer>
        <ModalPopup ref="incomeModal" data={this.editItem} modaltype="income" heading="Add a Income" onSave={this.saveIncome} />
        <ModalPopup ref="expanseModal" data={this.editItem} modaltype="expanse" heading="Add a Spending" onSave={this.saveIncome} />
      </div>
    );
  }
}

export default App;
