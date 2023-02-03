import React from 'react'
import { useSelector } from 'react-redux';
import './Account.css';

function Account() {
  const { user } = useSelector(state => state.user)

  return (
    <section>
      <div className='accountBar'>
        <p style={{fontSize: 60, color: 'gold', fontFamily: 'Cookie'}}>Account</p>
        <p style={{fontSize: 60, color: 'gold', fontFamily: 'Cookie'}}>{user.username}</p>
      </div>
      <div className='infoBox'>
        <p className='userInfo'><b>Firstname</b> = {user.firstname}</p>
        <p className='userInfo'><b>lastname</b> = {user.lastname}</p>
        <p className='userInfo'><b>Email</b> = {user.email}</p>
        <p className='userInfo'><b>Username</b> = {user.username}</p>
      </div>
   </section>
  );
}

export default Account;