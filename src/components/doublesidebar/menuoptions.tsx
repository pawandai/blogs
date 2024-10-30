"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import { ReactNode, useEffect, useMemo, useState } from "react";

type Props = {
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
};

const MenuOptions = ({ defaultOpen, children, className }: Props) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Sheet modal={false} {...openState}>
      {isMounted && (
        <SheetTrigger
          className={`${buttonVariants({
            variant: "secondary",
            size: "icon",
          })} fixed left-0 top-28 z-[100] md:!hidden flex opacity-80 backdrop-blur-3xl rounded-full`}
        >
          <MoveRight />
        </SheetTrigger>
      )}
      <SheetContent
        showX={!defaultOpen}
        side="left"
        className={cn(
          "bg-background border-border !z-[110] fixed top-0 border-r-[1px] p-6 shadow-none overflow-y-scroll thin-scrollbar",
          className,
          {
            "hidden md:inline-block z-0 w-[280px] xl:w-[300px] 2xl:w-[360px]":
              defaultOpen,
            "inline-block md:hidden z-[100] w-full": !defaultOpen,
          }
        )}
      >
        <SheetTitle></SheetTitle>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default MenuOptions;
