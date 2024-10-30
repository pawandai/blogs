"use client";

import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ExternalLink, Menu, Moon, Sun } from "lucide-react";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`mt-6 py-4 backdrop-blur-md bg-background/60 sticky top-0 z-20 ${className} border-b`}
    >
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-center mx-auto">
        <div className="flex gap-2">
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            Home
          </Link>
          <Link
            href="https://pawanawasthi.com.np/"
            target="_blank"
            className={`${buttonVariants({
              variant: "outline",
            })} border-2 border-purple-600`}
          >
            Portfolio &nbsp; <ExternalLink className="h-4 w-4" />
          </Link>

          <Button
            variant="ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden sm:px-10 px-2 flex items-center gap-2 justify-between">
        <Link
          href="https://pawanawasthi.com.np/"
          target="_blank"
          className={`${buttonVariants({
            variant: "outline",
          })} border-2 border-purple-600`}
        >
          Portfolio &nbsp; <ExternalLink className="h-4 w-4" />
        </Link>

        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent className="!z-[110]" side="left">
              <SheetHeader>
                <SheetTitle>{"<pawandai />"}</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Link
                    href="/"
                    className={buttonVariants({ variant: "ghost" })}
                  >
                    Home
                  </Link>
                  <Link
                    href="/resume.pdf"
                    target="_blank"
                    download="Pawan_Awasthi_resume"
                    className={buttonVariants({
                      variant: "outline",
                    })}
                  >
                    Resume
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    {theme === "dark" ? <Moon /> : <Sun />}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Header;
