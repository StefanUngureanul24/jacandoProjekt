import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import './form.css';

class SelectForm extends React.Component {
    constructor(props) {
        super(props);
        
        /*
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();
    }

    validateForm() {
        const firstname = this.state.firstname;
        const lastname = this.state.lastname;
        const email = this.state.email;
        const gender = this.state.gender;
    
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
    
        if (email) {
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
    
        if (firstname && lastname && email && gender) {
            // Constructing form data
            var signupformData = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                gender: gender
            }

            console.log(signupformData);

            // Post data to server
            axios.post('http://localhost:3001', signupformData)
                .then(function (response) {
                    //console.log(response);
                    //this.setState({message:'Succes'})
                    Swal.fire('Data successfully submitted', 'Ok', 'success');
                })
                .catch(function (error) {
                    Swal.fire('Error', 'X', 'error');
                });
        }
        else {
            Swal.fire('Error', 'X', 'error');
        }    
    }

    onChangeInput(event) {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState({[name]: value})

        //console.log(name + ' ' + value);
    }

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
            
                {/*<br />*/}
                <button className='submit' onClick={this.validateForm}>Submit</button>
        
                    

                </form>
            
            </div>
        );
    }
}

export default SelectForm;