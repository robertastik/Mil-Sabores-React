import React, { useState } from 'react';
import LoginComponent from '../components/Login';
import RegistroComponent from '../components/Registro';

export default function AutenticacionUsuario() {
    const [isLoginView, setIsLoginView] = useState(true);
    return(
        <div>
            {
                isLoginView? (
                    <LoginComponent onSwitch={ () => setIsLoginView(false) }/>
                ) : (
                    <RegistroComponent onSwitch={ () => setIsLoginView(true) }/>
                )
            }
        </div>
    );
}