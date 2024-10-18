import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
export default function Navigation({ auth }) {
  const links = [
    { title: "Posts", url: "/posts", type: "private" },
    { title: "Categories", url: "/categories", type: "private" },
  ];

  return (
    <div>
      <div className="flex align-center gap-3 ">
        <a href="/">
          <h1 className="text-2xl font-medium m-0">
            Posts
            <span className="text-purple-600">App</span>
          </h1>
        </a>
        <div className="flex">
          {links.map((link, index) => {
            if (link.type === "private" && !auth)  return;
            return (
              <Button key={index} variant="link">
                <NavLink to={link.url} className="text-slate-600">
                  {link.title}
                </NavLink>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
