/*
Create a Login Form with:
Email, Password, Submit button

Requirements:
Use controlled components

Validate:
Email should be valid
Password minimum length: 6
Show error messages
Disable submit button if form is invalid */

import { useState} from 'react'

function Loginform() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [formError, setFormError] = useState({email:'', password:''})
    const [disableSubmit, setDisableSubmit] = useState(false)

    function handleChange(e:any) {
        const { name, value } = e.target
        console.log(name)
        setForm((prev) => {
            return { ...prev, [name]: value }
        })

        validateInput(name, value)
        setDisableSubmit(false)

    }

    function validateInput(field: string, value: string) {
        if (field == 'email' && !value.match('^[^@]+@[^@]+\.[^@]+$')) {
            setFormError((prev) => {
                return { ...prev, email: 'Email is invalid' }
            })
        }
        if (field == 'password' && value.length < 6) {
            setFormError((prev) => {
                return { ...prev, password: 'Password must be 6 char or more' }
            })
        }
    }

    const handleSubmit = () => {

    }

    return (

        <form onSubmit={handleSubmit}>
            <input type='email' placeholder='Enter Email' name='email' value={form.email} onChange={handleChange} />
            <p>{formError?.email}</p>
            <br /><br />
            <input type='password' placeholder='enter Password' name='password' value={form.password} onChange={handleChange} /><br /><br />
            <p>{formError?.password}</p>
            <br />
            <button type='submit' disabled={disableSubmit}>Submit</button>
        </form>

    )

}


export default Loginform