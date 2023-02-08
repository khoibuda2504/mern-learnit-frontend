import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const RegisterForm = () => {
  const { registerUser } = useContext(AuthContext)
  const [alert, setAlert] = useState(null)
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const { username, password, confirmPassword } = registerForm
  const onChangeRegisterForm = event => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value
    })
  }

  const register = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setAlert({ type: 'danger', message: 'Passwords do not match' })
      const timeout = setTimeout(() => {
        setAlert(null)
        setTimeout(timeout)
      }, 2000)
      return
    }
    try {
      const registerData = await registerUser(registerForm)
      if (!registerData.success) {
        setAlert({ type: 'danger', message: registerData.message })
        const timeout = setTimeout(() => {
          setAlert(null)
          setTimeout(timeout)
        }, 2000)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Form className='my-4' onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group className='mb-3'>
          <Form.Control value={username} onChange={onChangeRegisterForm} type='text' placeholder='Username' name='username' required />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Control value={password} onChange={onChangeRegisterForm} type='password' placeholder='Password' name='password' required />
        </Form.Group>
        <Form.Group>
          <Form.Control value={confirmPassword} onChange={onChangeRegisterForm} type='password' placeholder='Confirm Password' name='confirmPassword' required />
        </Form.Group>
        <Button variant='success' type='submit' className='mt-3'>Register</Button>
      </Form>
      <p>Already have an account?
        <Link to='/login'>
          <Button variant='info' size='sm' className='ml-2'>Login</Button>
        </Link>
      </p>
    </>
  )
}

export default RegisterForm