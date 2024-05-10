import { Outlet, Navigate } from "react-router-dom"
import { useEffect } from 'react';
import './auth.css'
import {useTranslation} from "react-i18next";

const AuthLayout = () => {
  const { t } = useTranslation();

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
                    <p className="text-600">{t('sign.enter')}<br/>{t('sign.account')}</p>
                  </div>
                  <hr />
                  <p><a id="no-account" className="text-500 opacity-100 hover-pointer">{t('sign.continue')}</a> <span className="text-300" style={{fontSize: '.85em',color: 'var(--accent40)'}}>({t('sign.not-save')})</span></p>
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