import React from 'react'
import { Link } from 'react-router-dom'

const VerifyEmail = () => {
  return (
    <div>You have successfully registered your Email. <Link to="/login">Please click on link to login.</Link></div>
  )
}

export default VerifyEmail