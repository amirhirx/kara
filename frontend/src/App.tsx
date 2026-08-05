import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Menu } from "./components";
import Project from "./pages/Project";

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
                    path="/project/:id"
                    element={<Project />}
                />
            </Routes>
        </main>
    );
}

export default App;
