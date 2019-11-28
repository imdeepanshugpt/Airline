import React from 'react';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';
import { updatePassengerDetails } from '../../store/actions';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

class Form extends React.Component {
    renderInput = ({ input, label, type }) => {
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                <div style={{ padding: '5px', margin: '5px' }}>
                    <label style={{
                        marginRight: '10px'
                    }}>{label}</label>
                </div>
                <div style={{ padding: '5px', margin: '5px' }}>
                    {
                        type === 'textarea' ?
                            <TextareaAutosize  {...input} rows={4} aria-label="empty textarea" placeholder="Permanent Address" />
                            :
                            <Input type="text"  {...input} className="form-input" />
                    }
                </div>
            </div>
        );
    }

    onSubmit = (formValues) => {
        this.props.updatePassengerDetails(formValues.id, formValues);
    }
    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="name" component={this.renderInput} label="Enter Full Name" />
                <Field name="DOB" component={this.renderInput}
                    label="Date Of Birth" type="date"
                />
                <Field name="id" component={this.renderInput} label="Enter the PNR Number" />
                <Field name="ancillaryService" component={this.renderInput}
                    label="Enter the ancillary service" type="number" />
                <Field name="wheelChair" component={this.renderInput}
                    label="Do you need a wheel chair?" type="select" />
                <Field name="infants" component={this.renderInput}
                    label="Are you infant?"
                    type="select"
                />
                <Field name="passport" component={this.renderInput}
                    label="Passport Number"
                    type="text"
                />
                <Field name="address" component={this.renderInput}
                    label="Permanent Address"
                    type="textarea"
                />
                <Field name="meals" component={this.renderInput}
                    label="Meals"
                    type="select"
                />
                <Field name="shoppingDeal" component={this.renderInput}
                    label="Shopping Deal"
                    type="select"
                />
                <Button style={{
                    display: 'block',
                    margin: '20px',
                    backgroundColor: '#3f51b5',
                    color: 'white'
                }} type="submit">
                    Update
                    </Button>
            </form>
        );
    }
}
const formWrapped = reduxForm({
    form: 'passengerDetails'
})(Form);
const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        flights: state.airline.flights,
        passengerList: state.airline.passengers,
        initialValues: state.airline.managePassenger
    };
}
export default connect(mapStateToProps,
    {
        updatePassengerDetails
    })(formWrapped);