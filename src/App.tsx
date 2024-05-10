import { Routes, Route } from 'react-router-dom';
import './globals.css';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import { Home } from './_root/pages/';
import RootLayout from './_root/RootLayout';
import AuthLayout from './_auth/AuthLayout';
import NotFound from './NotFound'

const App = () => {
    return (
        <main>
            <Routes>
                {/* public routes */}
                <Route element={<AuthLayout />}>
                    <Route path="/sign"/>
                </Route>
                {/* private routes */}
                <Route element={<RootLayout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </main>
    )
}

export default App