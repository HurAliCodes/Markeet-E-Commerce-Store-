import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PackagePlus,
  Package,
  ShoppingCart,
} from "lucide-react";

const SideBar = () => {
  const navLinks = [
    {
      name: "Add Product",
      path: "/add",
      icon: PackagePlus,
    },
    {
      name: "Product List",
      path: "/list",
      icon: Package,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: ShoppingCart,
    },
  ];

  return (
    <aside className="min-h-screen w-20 md:w-64 border-r bg-white shadow-sm">
      
      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-4 pt-8">
        {navLinks.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 hoverEffect
                ${
                  isActive
                    ? "bg-shop_light_green text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />

              <span className="hidden md:block font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideBar;