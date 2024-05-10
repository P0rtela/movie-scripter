import { useEffect } from 'react'
import { LinearGradient } from 'react-text-gradients'
import {useTranslation} from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('404.first');
  }, []);

  return (
    <>
      <div className="h-screen w-100" style={{ display: "flex", alignContent: "center"}}>
        <div style={{
          height: "fit-content", width: "fit-content", margin: "auto auto", alignSelf: "center",
          display: "flex", alignContent: "center", flex: "wrap", alignItems: "center", flexDirection: "column"
        }}>
          <p style={{
            height: "fit-content", fontSize: "8em", lineHeight: "1em"
          }}>
            <LinearGradient  className="text-900" gradient={['to top left', 'var(--secondary) ,var(--primary) ,var(--accent)']}>
              404
            </LinearGradient>
          </p>
          <p className="text-600" style={{
            color: "var(--text)", fontSize: "1.5em", lineHeight: "1em"
          }}>{t('404.first')}
          </p>
          <a className='text-500 hover-pointer' href={'/'} style={{
            color: "var(--accent)", marginTop: "1em"
          }}>{t('404.back')}</a>
        </div>
      </div>
    </>
  )
}

export default NotFound