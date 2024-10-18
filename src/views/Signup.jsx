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
import { useContext, useState } from "react";
import { AuthStore } from "../context/AuthContext";

export default function Signup() {
  const [credentials, setCredentials] = useState({});
  const [passwordValidation, setPasswordValidation] = useState(null);
  const { register, validation, loading } = useContext(AuthStore);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleRegister = () => {
    if (credentials.password !== credentials.confirmPassword) {
      setPasswordValidation('Passwords do not match');
      return;
    }
    register(credentials);
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle className="text-purple-600">Sign up</CardTitle>
          <CardDescription>Sign up to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                onChange={(e) =>
                  setCredentials({ ...credentials, name: e.target.value })
                }
              />
              { validation.message && <small className="text-red-600">{validation.message}</small> }
            </div>
            <div className="flex flex-col space-y-1.5 mt-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
              { validation.message && <small className="text-red-600">{validation.message}</small> }
            </div>
            <div className="flex flex-col space-y-1.5 mt-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type='password'
                placeholder="Enter your password"
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              { validation.message && <small className="text-red-600">{validation.message}</small> }
            </div>
            <div className="flex flex-col space-y-1.5 mt-4">
              <Label htmlFor="password">Password Confirmation</Label>
              <Input
                id="password"
                type='password'
                placeholder="Confirm your password"
                onChange={(e) =>
                  setCredentials({ ...credentials, confirmPassword: e.target.value })
                }
              />
              { validation.message && <small className="text-red-600">{validation.message}</small> }
              { passwordValidation && <small className="text-red-600">{passwordValidation}</small> }
            </div>
            
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Button
              onClick={handleRegister}
              disabled={loading}
              variant="default"
              className="bg-purple-600 w-full hover:bg-purple-600"
            >
              Sign up
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
