import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Status } from "./pages/Status";
import { AdminPage } from "./pages/AdminPage";

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/status" element={<Status />} />
          <Route path="/admin" element={<AdminPage />}></Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
