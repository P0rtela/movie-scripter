import { Routes, Route } from 'react-router-dom';
import './globals.css';
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
                <Route index element={<RootLayout />} />
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </main>
    )
}

export default App