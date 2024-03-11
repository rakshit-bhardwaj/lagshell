'use client';

import React, { useState } from 'react';
import "../styles/main.css";
import "../styles/global.css"
import Groups from '../components/Groups';
import Sessions from '../components/Sessions';
import supabase from '../components/Supabaseclient';

const Main = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      if (error) {
        alert(error.message);
      } else {
        //console.log(data);
        setUser(data.user.email);
        setIsLoggedIn(true);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignup = async () => {
    try {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
      })
      if (error) {
        console.error(error);
      } else {
        //handleLogin();
        console.log(data);
      }
    } catch (error) {
      alert(error.message);
    } 
  }

  return (
    <div className="flex-container">
      {!isLoggedIn ? (
        <div className="card flex flex-col gap-y-11">
          <img src="../../shelllogo.png" alt="Logo" width="250" height="250"/>
          <div className='login-form'>
            <input type="text" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} style={{ color: 'black' }} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ color: 'black' }} />
            <button onClick={handleLogin} disabled={!email || !password}>Login</button>
            <button onClick={handleSignup} disabled={!email || !password}>Sign Up</button>
          </div>
        </div>
      ) : (
        <div className='goands'>
          <button onClick={handleLogout} className='bg-slate text-white rounded logoutbutton'>Logout</button>
          <div className="flex ">
            <div className="groups-column" style={{ flex: '1' }}>
              <Groups setSelectedGroup={setSelectedGroup} user={user} supabase={supabase}/>
            </div>
            <div className="sessions-column" style={{ flex: '3' }}>
              {selectedGroup !== null && (
                <Sessions selectedGroup={selectedGroup} supabase={supabase}/>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;


