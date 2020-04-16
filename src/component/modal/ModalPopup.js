import React, { Component } from 'react'
import { Modal, Button, FormLabel, FormGroup, FormControl } from 'react-bootstrap'

export class ModalPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            isValidData: false
        };
    }
    openModal = () => {
        this.setState({
            modalIsOpen: true,
            isValidData: false
        });
    }
    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    onSaveClick = () => {
        this.props.onSave({
            id: this.props.data.id,
            date: this.date.value.split('-').join('.'),
            amount: this.amount.value,
            note: this.note.value,
            type: this.props.modaltype
        });
        this.closeModal();
    }

    validateHandler = () => {
        this.setState({ ...this.state, isValidData: !!(this.date.value && this.amount.value) })
    }

    componentDidMount() {
        this.setState({ isValidData: false });
    }

    render() {
        const today = new Date()
        today.setDate(today.getDate())
        let dateValue = today.toISOString().substr(0, 10)

        const { title = "", date = "", amount = "", note = "" } = this.props.data;
        const heading = this.props.heading
        return (
            <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{(!title) ? heading : "Add a Detail"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup>
                            <FormLabel>Date</FormLabel>
                            <FormControl
                                type="date"
                                placeholder="Enter a Date of income dd/mm/yyyy"
                                ref={(ref) => { this.date = ref }}
                                defaultValue={dateValue}
                                onChange={this.validateHandler}
                                max={date}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Amount</FormLabel>
                            <FormControl
                                type="number"
                                placeholder="Enter Amount in Numbers"
                                ref={(ref) => { this.amount = ref }}
                                defaultValue={amount}
                                onChange={this.validateHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Note:</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Please add Note"
                                ref={(ref) => { this.note = ref }}
                                defaultValue={note}
                                onChange={this.validateHandler}
                            />
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.onSaveClick} variant="primary" disabled={!this.state.isValidData}>Save</Button>
                    <Button onClick={this.closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalPopup
