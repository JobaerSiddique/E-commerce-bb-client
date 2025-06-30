// // components/Navbar.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState, useEffect } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { Menu, X } from "lucide-react";

// export default function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Products", href: "/products" },
//     { name: "Services", href: "/services" },
    
//     { name: "Blog", href: "/blog" },
//     { name: "Contact", href: "/contact" },
//     { name: "Login", href: "/login" },
//   ];

//   const megaMenuItems = [
//     {
//       title: "Web Development",
//       items: [
//         { name: "Frontend", href: "/services/frontend" },
//         { name: "Backend", href: "/services/backend" },
//         { name: "Fullstack", href: "/services/fullstack" },
//       ],
//     },
//     {
//       title: "Design",
//       items: [
//         { name: "UI/UX", href: "/services/ui-ux" },
//         { name: "Graphic Design", href: "/services/graphic-design" },
//         { name: "Branding", href: "/services/branding" },
//       ],
//     },
//     {
//       title: "Marketing",
//       items: [
//         { name: "SEO", href: "/services/seo" },
//         { name: "Content Marketing", href: "/services/content-marketing" },
//         { name: "Social Media", href: "/services/social-media" },
//       ],
//     },
//   ];

//   return (
//     <header
//       className={`sticky top-0 z-50 transition-all duration-300 ${
//         isScrolled ? "bg-gray-300 shadow-md" : "bg-gray-300"
//       }`}
//     >
//       <nav
//         className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8 text-black"
//         aria-label="Global"
//       >
//         {/* Logo */}
//         <div className="flex lg:flex-1">
//           <Link href="/" className="-m-1.5 p-1.5">
//             <span className="text-xl font-bold text-black">YourLogo</span>
//           </Link>
//         </div>

//         {/* Mobile menu button */}
//         <div className="flex lg:hidden">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="text-white hover:bg-white/10"
//           >
//             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </Button>
//         </div>

//         {/* Desktop Navigation */}
//         <div className="hidden lg:flex lg:gap-x-12">
//           {navLinks.map((link) => {
//             if (link.name === "Services") {
//               return (
//                 <DropdownMenu key={link.name}>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       className={`text-sm font-semibold leading-6 ${
//                         pathname === link.href
//                           ? "text-white"
//                           : "text-white/70 hover:text-white"
//                       }`}
//                     >
//                       {link.name}
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent className="w-[600px] p-4">
//                     <div className="grid grid-cols-3 gap-4">
//                       {megaMenuItems.map((category) => (
//                         <div key={category.title}>
//                           <h3 className="mb-2 font-bold text-primary">
//                             {category.title}
//                           </h3>
//                           <ul className="space-y-2">
//                             {category.items.map((item) => (
//                               <DropdownMenuItem key={item.name} asChild>
//                                 <Link
//                                   href={item.href}
//                                   className="block w-full p-2 text-sm hover:bg-gray-100"
//                                 >
//                                   {item.name}
//                                 </Link>
//                               </DropdownMenuItem>
//                             ))}
//                           </ul>
//                         </div>
//                       ))}
//                     </div>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               );
//             }
//             return (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className={`text-sm font-semibold leading-6 ${
//                   pathname === link.href
//                     ? "text-black"
//                     : "text-orange/70 hover:text-black"
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             );
//           })}
//         </div>

//         {/* CTA Button */}
//         <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//           <Button variant="outline" className="text-black hover:bg-white/10">
//             Get Started
//           </Button>
//         </div>
//       </nav>

//       {/* Mobile Navigation */}
//       {mobileMenuOpen && (
//         <div className="lg:hidden">
//           <div className="space-y-2 px-6 pb-6 pt-2">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
//                   pathname === link.href
//                     ? "bg-white/10 text-white"
//                     : "text-white/70 hover:bg-white/10 hover:text-white"
//                 }`}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 {link.name}
//               </Link>
//             ))}
//             <div className="pt-4">
//               <h3 className="mb-2 font-bold text-white">Services</h3>
//               <div className="space-y-2 pl-4">
//                 {megaMenuItems.map((category) => (
//                   <div key={category.title}>
//                     <h4 className="text-sm font-semibold text-white/80">
//                       {category.title}
//                     </h4>
//                     <ul className="mt-1 space-y-1 pl-2">
//                       {category.items.map((item) => (
//                         <li key={item.name}>
//                           <Link
//                             href={item.href}
//                             className="block rounded-md px-2 py-1 text-sm text-white/70 hover:bg-white/10 hover:text-white"
//                             onClick={() => setMobileMenuOpen(false)}
//                           >
//                             {item.name}
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// 'use client';

// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [megaMenuOpen, setMegaMenuOpen] = useState(false);

//   // Sticky navbar on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Nav links data
//   const navLinks = [
//     { name: 'Home', href: '/' },
//     { name: 'Shop', href: '/shop' },
//     { name: 'Categories', href: '/categories', megaMenu: true },
//     { name: 'About', href: '/about' },
//     { name: 'Contact', href: '/contact' },
//     { name: 'Blog', href: '/blog' },
//   ];

//   // Mega menu categories data
//   const megaMenuCategories = [
//     {
//       title: 'Electronics',
//       items: ['Smartphones', 'Laptops', 'TVs', 'Cameras'],
//     },
//     {
//       title: 'Fashion',
//       items: ['Men', 'Women', 'Kids', 'Accessories'],
//     },
//     {
//       title: 'Home & Living',
//       items: ['Furniture', 'Kitchen', 'Decor', 'Lighting'],
//     },
//   ];

//   return (
//     <header
//       className={`sticky top-0 z-50 transition-all duration-300 ${
//         isScrolled ? 'bg-primary shadow-md' : 'bg-secondary'
//       }`}
//     >
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link href="/" className="text-white font-bold text-xl">
//               YourLogo
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <div key={link.name} className="relative">
//                 {link.megaMenu ? (
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button
//                         variant="ghost"
//                         className="text-white hover:bg-primary/90 flex items-center gap-1"
//                         onMouseEnter={() => setMegaMenuOpen(true)}
//                         onMouseLeave={() => setMegaMenuOpen(false)}
//                       >
//                         {link.name}
//                         {megaMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent
//                       className="w-[800px] p-4"
//                       onMouseEnter={() => setMegaMenuOpen(true)}
//                       onMouseLeave={() => setMegaMenuOpen(false)}
//                     >
//                       <div className="grid grid-cols-3 gap-6">
//                         {megaMenuCategories.map((category) => (
//                           <div key={category.title}>
//                             <h3 className="font-bold text-lg mb-2">{category.title}</h3>
//                             <ul className="space-y-2">
//                               {category.items.map((item) => (
//                                 <DropdownMenuItem key={item} asChild>
//                                   <Link
//                                     href={`/categories/${item.toLowerCase()}`}
//                                     className="hover:text-primary cursor-pointer"
//                                   >
//                                     {item}
//                                   </Link>
//                                 </DropdownMenuItem>
//                               ))}
//                             </ul>
//                           </div>
//                         ))}
//                       </div>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 ) : (
//                   <Link
//                     href={link.href}
//                     className="text-white hover:text-primary/90 transition-colors"
//                   >
//                     {link.name}
//                   </Link>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <Button
//               variant="ghost"
//               className="text-white"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-primary/95">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             {navLinks.map((link) => (
//               <div key={link.name}>
//                 {link.megaMenu ? (
//                   <div className="relative">
//                     <Button
//                       variant="ghost"
//                       className="w-full justify-between text-white"
//                       onClick={() => setMegaMenuOpen(!megaMenuOpen)}
//                     >
//                       {link.name}
//                       {megaMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                     </Button>
//                     {megaMenuOpen && (
//                       <div className="pl-4 space-y-2 bg-primary/80">
//                         {megaMenuCategories.map((category) => (
//                           <div key={category.title} className="pt-2">
//                             <h3 className="font-bold text-white">{category.title}</h3>
//                             <ul className="pl-2 space-y-1 mt-1">
//                               {category.items.map((item) => (
//                                 <li key={item}>
//                                   <Link
//                                     href={`/categories/${item.toLowerCase()}`}
//                                     className="block px-3 py-2 text-white/80 hover:text-white"
//                                     onClick={() => {
//                                       setMobileMenuOpen(false);
//                                       setMegaMenuOpen(false);
//                                     }}
//                                   >
//                                     {item}
//                                   </Link>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <Link
//                     href={link.href}
//                     className="block px-3 py-2 text-white hover:bg-primary/80 rounded-md"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     {link.name}
//                   </Link>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronUp, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getCurrentUser, removeUser} from '@/service/actions/auth.services';
import { useRouter } from 'next/navigation';
import { authKey } from '@/contants/authkey';
import AuthButton from '../Button/AuthButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


  const router = useRouter();

  // Get user on component mount
 const user = getCurrentUser()

  // Sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Nav links data - conditionally show based on auth state
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories', megaMenu: true },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // Mega menu categories data
  const megaMenuCategories = [
    {
      title: 'Electronics',
      items: ['Smartphones', 'Laptops', 'TVs', 'Cameras'],
    },
    {
      title: 'Fashion',
      items: ['Men', 'Women', 'Kids', 'Accessories'],
    },
    {
      title: 'Home & Living',
      items: ['Furniture', 'Kitchen', 'Decor', 'Lighting'],
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Searching for:', searchQuery);
  };

  

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 bg-[#09f871] ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Top Row - Logo, Search (mobile), Menu Button */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-gray-900 font-bold text-xl">
              YourLogo
            </Link>
          </div>

          {/* Mobile Search and Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-900 hover:bg-green-600/20"
              onClick={() => document.getElementById('mobile-search')?.focus()}
            >
              <Search size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-900 hover:bg-green-600/20"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

          {/* Desktop Search Bar */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-6"
          >
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-4 pr-10 py-2 w-full rounded-full border-gray-300 focus-visible:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full text-gray-500 hover:text-green-700"
              >
                <Search size={18} />
              </Button>
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.megaMenu ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-gray-900 hover:bg-green-600/20 flex items-center gap-1"
                        onMouseEnter={() => setMegaMenuOpen(true)}
                        onMouseLeave={() => setMegaMenuOpen(false)}
                      >
                        {link.name}
                        {megaMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-[800px] p-4"
                      onMouseEnter={() => setMegaMenuOpen(true)}
                      onMouseLeave={() => setMegaMenuOpen(false)}
                    >
                      <div className="grid grid-cols-3 gap-6">
                        {megaMenuCategories.map((category) => (
                          <div key={category.title}>
                            <h3 className="font-bold text-lg mb-2">{category.title}</h3>
                            <ul className="space-y-2">
                              {category.items.map((item) => (
                                <DropdownMenuItem key={item} asChild>
                                  <Link
                                    href={`/categories/${item.toLowerCase()}`}
                                    className="hover:text-green-600 cursor-pointer"
                                  >
                                    {item}
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={link.href}
                    className="text-gray-900 hover:bg-green-600/20 px-3 py-2 rounded-md transition-colors"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            {/* User dropdown or login button */}
            {/* {user?.userId ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-900 hover:bg-green-600/20 flex items-center gap-1"
                  >
                    <User size={18} />
                    <span>Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className="text-gray-900 hover:bg-green-600/20 px-3 py-2 rounded-md transition-colors"
              >
                Login
              </Link>
            )} */}
            <AuthButton/>
          </nav>
        </div>

        {/* Mobile Search Bar - Only shown when not in menu */}
        {!mobileMenuOpen && (
          <form onSubmit={handleSearch} className="md:hidden mb-3">
            <div className="relative w-full">
              <Input
                id="mobile-search"
                type="text"
                placeholder="Search products..."
                className="pl-4 pr-10 py-2 w-full rounded-full border-gray-300 focus-visible:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full text-gray-500 hover:text-green-700"
              >
                <Search size={18} />
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-green-600/95">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.megaMenu ? (
                  <div className="relative">
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-white hover:bg-green-700/90"
                      onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                    >
                      {link.name}
                      {megaMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Button>
                    {megaMenuOpen && (
                      <div className="pl-4 space-y-2 bg-green-700/80">
                        {megaMenuCategories.map((category) => (
                          <div key={category.title} className="pt-2">
                            <h3 className="font-bold text-white">{category.title}</h3>
                            <ul className="pl-2 space-y-1 mt-1">
                              {category.items.map((item) => (
                                <li key={item}>
                                  <Link
                                    href={`/categories/${item.toLowerCase()}`}
                                    className="block px-3 py-2 text-white/90 hover:text-white hover:bg-green-700/70 rounded-md"
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      setMegaMenuOpen(false);
                                    }}
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="block px-3 py-2 text-white hover:bg-green-700/90 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile auth links */}
            {user?.userId ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-white hover:bg-green-700/90 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="block px-3 py-2 text-white hover:bg-green-700/90 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  className="block w-full text-left px-3 py-2 text-white hover:bg-green-700/90 rounded-md"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block px-3 py-2 text-white hover:bg-green-700/90 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;