import React, {useState} from 'react';

class SelectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Gender : ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>First Name</label>
                <input type="text"></input>
                
                <label>Last Name</label>
                <input type="text"></input>

                <label>Email</label>
                <input type="email"></input>

                <label>
                    Gender:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="nonbinary">Non-Binary</option>                        
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default SelectForm;