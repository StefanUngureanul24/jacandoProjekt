import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

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
    
        /*
        if (firstname) 
            alert('Succes')
        else
            alert('Fail')
        

        if (gender === "")
            alert('Fail')
        else
            alert('Succes')
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
                Swal.fire('Data successfully submitted', 'Ok', 'succes');
            })
            .catch(function (error) {
                Swal.fire('Error', 'X', 'error');
            });        
    }

    onChangeInput(event) {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState({[name]: value})

        //console.log(name + ' ' + value);
    }

    /*
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Gender : ' + this.state.value);
        event.preventDefault();
    }
    

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
        alert(e.target.value);
    };
    */

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {/*
                <label>First Name</label>
                <input 
                    type="text"
                    name="fname"
                    //placeholder="First Name"
                    onChange={this.handleInputChange}                      
                />
                
                <label>Last Name</label>
                <input 
                    type="text" 
                    name="lname"
                    onChange={this.handleInputChange}
                />

                <label>Email</label>
                <input 
                    type="email"
                    name="email"
                    onChange={this.handleInputChange}                      
                />

                <label>
                    Gender:
                    <select value={this.state.value} onChange={this.handleInputChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="nonbinary">Non-Binary</option>                        
                    </select>
                </label>
                <button type="submit">Submit</button>
                */}
            
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
                //value=""
            />

            <select
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
            
            <button onClick={this.validateForm}>Submit</button>
            </form>
            
            
        );
    }
}

export default SelectForm;