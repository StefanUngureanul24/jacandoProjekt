import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import validator from 'validator';

import './form.css';

class SelectForm extends React.Component {
    constructor(props) {
        super(props);
        
        /* 
            State to get input and select value

            dataError: variables to manage error when
                input field is empty
                or gender select element has its default value
                will turn border red and not send data to the server
        */
        this.state = {
           firstname: "",
           lastname: "",
           email: "",
           gender: "",
           firstnameError: false,
           lastnameError: false,
           emailError: false,
           genderError: false
       }
       this.validateForm = this.validateForm.bind(this);
       this.onChangeInput = this.onChangeInput.bind(this);        
    }

    /* 
        Change page's title to Form Jacando AG
        when the component is inserted to the DOM 
    */
    componentDidMount() {
        document.title = "Form Jacando AG"
    }

    /* 
        Prevent page from refreshing after submit
    */
    handleSubmit(event) {
        event.preventDefault();
    }

    /* 
        Function when data is submitted
    */
    validateForm() {
        /* 
            All input values
        */
        const firstname = this.state.firstname;
        const lastname = this.state.lastname;
        const email = this.state.email;
        const gender = this.state.gender;
        
        /* 
            If input fields are empty
            then variableError are changed   
        */
        if (firstname) {
            this.setState({firstnameError: false})
        }    
        else {
            this.setState({firstnameError: true})
        }
    
        if (lastname) {
            this.setState({lastnameError: false})
        }    
        else {
            this.setState({lastnameError: true})
        }
    
        /*
            Special case:
            if email is not empty and has an email adress format
            verified with validator
        */
        if (email && validator.isEmail(email)) {
            this.setState({emailError: false})
        }    
        else {
            this.setState({emailError: true})
        }

        if (gender) {
            this.setState({genderError: false})
        }    
        else {
            this.setState({genderError: true})
        }
    
        /* 
            If all input and select fields have a non-empty value
            then send data to the server
        */
        if (firstname && lastname && email && validator.isEmail(email) && gender) {
            // Constructing form data
            var signupformData = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                gender: gender
            }

            console.log(signupformData);

            /* 
                Post data to server using axios 
                and print success or error message 
                using sweetalert
            */
            axios.post('http://localhost:3001', signupformData)
                .then(function (response) {
                    Swal.fire('Data successfully submitted', '', 'success');
                })
                .catch(function (error) {
                    Swal.fire('Error', 'Connexion not properly established', 'error');                    
                });
        }
        /* 
            If one or more empty input/select values
            are empty
        */
        else {
            Swal.fire('Error', 'Please fill all the data in', 'error');
        }    
    }

    /* 
        Change component state when values
        are added to the input/select fields
    */
    onChangeInput(event) {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState({[name]: value})
    }

    /* 
        UI structure:
        - container
            - title
            - First Name input field
            - Last Name input field
            - Email input field
            - Gender select field 
            - Button to submit data
    */
    render() {
        return (
            <div className='container'>
                <h2>Info</h2>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        style={{border: (this.state.firstnameError)?"2px solid red":""}}
                        value={this.state.firstname}
                        name="firstname"
                        placeholder="First Name *"
                        onChange={(e) => this.onChangeInput(e)}
                    />
            
                    <input 
                        type="text"
                        style={{border: (this.state.lastnameError)?"2px solid red":""}}
                        value={this.state.lastname}
                        name="lastname"
                        placeholder="Last Name *"
                        onChange={(e) => this.onChangeInput(e)}
                    />
            
                    <input 
                        type="email"
                        style={{border: (this.state.emailError)?"2px solid red":""}}
                        value={this.state.email}
                        name="email"
                        placeholder="Email *"
                        onChange={(e) => this.onChangeInput(e)}
                    />
            
                    <select
                        className="selectGender"
                        style={{border: (this.state.genderError)?"2px solid red":""}}
                        value={this.state.gender}
                        name="gender"
                        onChange={(e) => this.onChangeInput(e)}
                    >
                        <option value="">Gender *</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="nonbinary">Non-binary</option>
                    </select>
            
                <button className='submit' onClick={this.validateForm}>Submit</button>
                            
                </form>            
            </div>
        );
    }
}

export default SelectForm;