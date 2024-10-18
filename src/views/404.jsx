import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div>
        <h1 className="text-purple-600 text-center text-3xl">
          404 | NOT FOUND
        </h1>
        <p className="text-center mt-2">Page your looking for does not exist</p>
      </div>
      <div className="mt-3">
        <NavLink to='/'>
          <Button variant="ghost" color="purple">
            Back to Home
          </Button>
        </NavLink>
      </div>
    </div>
  );
}
