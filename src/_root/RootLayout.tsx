import { Outlet } from 'react-router-dom'
import {useTranslation} from "react-i18next";

function RootLayout() {

  const {t} = useTranslation("common");
  return (
    <>
      <div>RootLayout</div>
      <h1>{t('app.title')}</h1>
    </>
  )
}

export default RootLayout
