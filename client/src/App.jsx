import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Register, Login, Chat } from "./pages";

import './App.css';

const App = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Chat />} />
        </Routes>
    </BrowserRouter>;
}

export default App;