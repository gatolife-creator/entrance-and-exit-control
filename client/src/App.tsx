import { Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Status } from "./pages/Status";
import { AdminPage } from "./pages/AdminPage";
import { Gate } from "./pages/Gate";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <RecoilRoot>
      <Navbar />
      <ToastContainer />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/status" element={<Status />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/gate" element={<Gate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </RecoilRoot>
  );
}

export default App;
