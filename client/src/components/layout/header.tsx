import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/#services", label: "Services" },
    { href: "/#gallery", label: "Gallery" },
    { href: "/#testimonials", label: "Testimonials" },
  ];

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <NavigationMenuItem key={item.href}>
          <Link href={item.href}>
            <NavigationMenuLink
              className="px-4 py-2 hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      ))}
    </>
  );

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-semibold text-primary hover:opacity-80 transition-opacity duration-200">
            BriArtistry
          </a>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <NavLinks />
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/booking">
          <Button
            className="hidden md:inline-flex hover:opacity-90 transition-opacity duration-200"
          >
            Book Now
          </Button>
        </Link>
      </div>
    </header>
  );
}