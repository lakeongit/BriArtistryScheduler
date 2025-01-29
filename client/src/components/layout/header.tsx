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
    { href: "/about", label: "About" },
  ];

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <NavigationMenuItem key={item.href}>
          <Link href={item.href}>
            <NavigationMenuLink
              className="group inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
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
          <a className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity duration-200">
            BriArtistry
          </a>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="gap-2">
            <NavLinks />
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] p-6">
            <nav className="flex flex-col gap-6 mt-8">
              <NavLinks />
              <Link href="/booking">
                <Button className="w-full" size="lg">
                  Book Now
                </Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/booking">
          <Button
            size="lg"
            className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all duration-200"
          >
            Book Now
          </Button>
        </Link>
      </div>
    </header>
  );
}