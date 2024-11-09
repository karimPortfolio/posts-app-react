import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useContext, useRef, useState } from "react";
import { AuthStore } from "../context/AuthContext";
import { FaRegEye } from "react-icons/fa";


export default function Signin() {
  const [credentials, setCredentials] = useState({});
  const { login, validation, loading } = useContext(AuthStore);

  const passwordInput = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLogin = () => {
    login(credentials);
  };

  const handleShowPassword = () => {
    passwordInput.current.type = passwordInput.current.type === 'password' ? 'text' : 'password'; 
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle className="text-purple-600">Sign in</CardTitle>
          <CardDescription>Sign in to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
              {validation.message && <small className="text-red-600">{validation.message}</small>}
            </div>
            <div className="flex flex-col space-y-1.5 mt-4 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                ref={passwordInput}
                type='password'
                placeholder="Enter your password"
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              <Button variant="ghost" className="absolute inset-y-[15px] hover:bg-transparent right-0 px-4" onClick={handleShowPassword}>
                <FaRegEye />
              </Button>
              {validation.message && <small className="text-red-600">{validation.message}</small>}
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Button
              onClick={handleLogin}
              disabled={loading}
              variant="default"
              className="bg-purple-600 w-full hover:bg-purple-600"
            >
              Sign in
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
