"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BUSINESS_WHATSAPP_NUMBER } from "@/lib/constants/contact-constants";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";

export const NavigationSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>
      <SheetTrigger asChild>
        <Button
          className={`
            relative h-10 w-10 rounded-md transition-colors
            hover:bg-accent hover:text-accent-foreground
          `}
          size="icon"
          variant="ghost"
        >
          <Menu className="!size-7" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className={`
          flex w-64 flex-col border-l border-border/40 bg-background/95
          backdrop-blur-md
          supports-[backdrop-filter]:bg-background/80
        `}
        side="right"
      >
        <Logo />

        <Separator className="bg-primary/10" />

        <div className="mt-2 flex-1">
          <NavMenu
            onItemClick={() => setIsOpen(false)}
            orientation="vertical"
          />
        </div>

        <div
          className={`
            mt-auto mb-4 rounded-xl border border-primary/10 bg-primary/5 p-4
            text-center
          `}
        >
          <p className="text-lg font-bold text-primary">
            Haz tu evento inolvidable
          </p>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            Postres personalizados para cualquier ocasion
          </p>
          <Link href="/quote-event" onClick={() => setIsOpen(false)}>
            <Button className="mt-3 w-full font-bold" size="lg">
              Cotiza tu Evento!
            </Button>
          </Link>
        </div>

        <a
          href={`https://wa.me/52${BUSINESS_WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          className={`
            mb-4 flex items-center justify-center gap-2 rounded-lg py-2 text-sm
            font-medium text-muted-foreground transition-colors
            hover:text-primary
          `}
        >
          <MessageCircle className="h-4 w-4" />
          Escríbenos por WhatsApp
        </a>
      </SheetContent>
    </Sheet>
  );
};
