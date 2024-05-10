import { Outlet, Navigate } from "react-router-dom"
import { useEffect } from 'react';
import './auth.css'

const AuthLayout = () => {

  useEffect(() => {
    document.title = 'logar';
  }, []);

  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ?
        (<Navigate to="/" />
        ) : (
          <>
            <div id="auth-layout" className="w-100 h-screen">
              <section id="auth-area">
                <div id="auth-form">
                  <div id="google-login-button" className="hover-pointer no-select">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"></img>
                    <p className="text-600">Entre com a sua <br/> Conta Google</p>
                  </div>
                  <hr />
                  <p><a id="no-account" className="text-500 opacity-100 hover-pointer">Continuar sem logar</a> <span className="text-300" style={{fontSize: '.85em',color: 'var(--accent30)'}}>(seu roteiro não será salvo)</span></p>
               </div>
              </section>
              <img id="sign-side-image" className="w-100 h-screen" src="images/sign-side-image.png" />
            </div>
          </>
        )}
    </>
  )
}
export default AuthLayout