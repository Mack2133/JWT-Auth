import axios from "axios"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignUpForm() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSignUp = () => {
    // event.preventDefault()
    axios.post("http://localhost:3000/api/user/signup", {
      username: username,
      email: email,
      password: password
    }).then((response) => {
      console.log(response)
      navigate("/login")
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <Card className="mx-auto max-w-sm max-h-max">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="grid gap-2">
              <Label htmlFor="User-name">User name</Label>
              <Input id="User-name" placeholder="jhon" required onChange={(e) => {
                setUsername(e.target.value)
              }} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="jhon@example.com"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" onChange={(e) => {
              setPassword(e.target.value);
            }} />
          </div>
          <Button type="submit" className="w-full" onClick={handleSignUp}>
            Create an account
          </Button>
          {/* <Button variant="outline" className="w-full">
            Sign up with GitHub
          </Button> */}
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link  to={"/login"} className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
