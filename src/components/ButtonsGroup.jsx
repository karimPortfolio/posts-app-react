import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
export default function ButtonsGroup() {
  const links = [
    { title: "Sign in", url: "/signin", variant: "ghost" },
    { title: "Sign up", url: "/signup", variant: "destructive" },
  ];

  return (
    <div>
      <div className="flex align-center gap-3 ">
        {links.map((link, index) => {
          return (
            <Button
              key={index}
              variant={link.variant}
              className={
                link.variant === "destructive"
                  ? "bg-purple-600 hover:bg-purple-500"
                  : null
              }
            >
              <NavLink to={link.url}>{link.title}</NavLink>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
