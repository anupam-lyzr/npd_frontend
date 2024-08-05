// import {TabsDemo } from "@/pages/tabs"
import "./App.css";
// import LoginPage from './pages/login';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmailToPO from "./pages/gpt_home";

export default function Home() {
  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<LoginPage />} />
  //       <Route path="/home" element={<TabsDemo />} />
  //     </Routes>
  //   </Router>
  // )
  return (
    <div className="flex items-center justify-center">
      <EmailToPO />
    </div>
  )
}
