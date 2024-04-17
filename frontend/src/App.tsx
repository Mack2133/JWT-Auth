import Home from "./components/Home"
import { LoginForm } from "./components/LoginFrom"
import { SignUpForm } from "./components/ui/SignUpForm"
import { Routes, Route } from "react-router-dom"

export default function App() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-[url('/public/bg-image.png')] bg-cover bg-no-repeat">
        <Routes>
          <Route path="/" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
        </Routes>
    </div>
  )
}