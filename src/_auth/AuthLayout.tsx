import { Navigate } from "react-router-dom"
import { useEffect } from 'react';
import './auth.css'
import {useTranslation} from "react-i18next";
import GoogleComponent from "../google/GoogleLegacy";

const AuthLayout = () => {
  const { t } = useTranslation();

  useEffect(() => {
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
                    <img id="google-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"></img>
                    <p className="text-600">{t('sign.enter')}<br/>{t('sign.account')}</p>
                  </div>
                  <div><p id="no-account" className="text-500 opacity-100 hover-pointer">{t('sign.continue')}</p></div>
               </div>
              </section>
            </div>
          </>
        )}
    </>
  )
}
export default AuthLayout