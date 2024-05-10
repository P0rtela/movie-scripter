import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";

i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)