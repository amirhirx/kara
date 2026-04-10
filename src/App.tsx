import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Menu } from "./components";

function App() {
    return (
        <main>
            <Menu />
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
            </Routes>
        </main>
    );
}

export default App;
