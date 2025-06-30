// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
    
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Login", href: "/login" },
  ];

  const megaMenuItems = [
    {
      title: "Web Development",
      items: [
        { name: "Frontend", href: "/services/frontend" },
        { name: "Backend", href: "/services/backend" },
        { name: "Fullstack", href: "/services/fullstack" },
      ],
    },
    {
      title: "Design",
      items: [
        { name: "UI/UX", href: "/services/ui-ux" },
        { name: "Graphic Design", href: "/services/graphic-design" },
        { name: "Branding", href: "/services/branding" },
      ],
    },
    {
      title: "Marketing",
      items: [
        { name: "SEO", href: "/services/seo" },
        { name: "Content Marketing", href: "/services/content-marketing" },
        { name: "Social Media", href: "/services/social-media" },
      ],
    },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-300 shadow-md" : "bg-gray-300"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8 text-black"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold text-black">YourLogo</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white hover:bg-white/10"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navLinks.map((link) => {
            if (link.name === "Services") {
              return (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`text-sm font-semibold leading-6 ${
                        pathname === link.href
                          ? "text-white"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[600px] p-4">
                    <div className="grid grid-cols-3 gap-4">
                      {megaMenuItems.map((category) => (
                        <div key={category.title}>
                          <h3 className="mb-2 font-bold text-primary">
                            {category.title}
                          </h3>
                          <ul className="space-y-2">
                            {category.items.map((item) => (
                              <DropdownMenuItem key={item.name} asChild>
                                <Link
                                  href={item.href}
                                  className="block w-full p-2 text-sm hover:bg-gray-100"
                                >
                                  {item.name}
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold leading-6 ${
                  pathname === link.href
                    ? "text-black"
                    : "text-orange/70 hover:text-black"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button variant="outline" className="text-black hover:bg-white/10">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-2 px-6 pb-6 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                  pathname === link.href
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <h3 className="mb-2 font-bold text-white">Services</h3>
              <div className="space-y-2 pl-4">
                {megaMenuItems.map((category) => (
                  <div key={category.title}>
                    <h4 className="text-sm font-semibold text-white/80">
                      {category.title}
                    </h4>
                    <ul className="mt-1 space-y-1 pl-2">
                      {category.items.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="block rounded-md px-2 py-1 text-sm text-white/70 hover:bg-white/10 hover:text-white"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}