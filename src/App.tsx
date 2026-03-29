import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Menu } from "./components";
import New from "./pages/New";

function App() {
    return (
        <main>
            <Menu />
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/new"
                    element={<New />}
                />
            </Routes>
        </main>
    );
}

export default App;
