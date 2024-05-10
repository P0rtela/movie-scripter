import { Routes, Route } from 'react-router-dom';
import './globals.css';
import RootLayout from './_root/RootLayout';
import AuthLayout from './_auth/AuthLayout';
import NotFound from './NotFound'
import i18next from './i18n'

i18next.t('my.key')

const App = () => {

    return (
        <main>
            <Routes>
                {/* public routes */}
                <Route path="/sign" element={<AuthLayout />}  />
                {/* private routes */}
                <Route index element={<RootLayout />} />
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </main>
    )
}

export default App