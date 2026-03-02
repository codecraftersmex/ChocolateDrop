"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BUSINESS_WHATSAPP_NUMBER } from "@/lib/constants/contact-constants";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ArrowRight, Menu, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
          flex w-72 flex-col border-l border-border/40 bg-background/95
          backdrop-blur-md
          supports-[backdrop-filter]:bg-background/80
        `}
        side="right"
      >

        <div className="mt-8 flex-1">
          <NavMenu
            onItemClick={() => setIsOpen(false)}
            orientation="vertical"
          />
        </div>

        <div
          className={`
            mt-auto rounded-xl border border-primary/10 bg-primary/5 p-4
            text-center
          `}
        >
          <p className="text-lg font-bold tracking-tight text-primary">
            Haz tu evento inolvidable
          </p>
          <p
            className={`
              mt-1 text-sm leading-snug font-medium text-muted-foreground
            `}
          >
            Mesa de postres a tu medida, cotiza en minutos.
          </p>
          <Button
            asChild
            className={`
              group mt-4 h-11 w-full rounded-lg font-semibold shadow-md
              shadow-primary/20 transition-all
              hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30
            `}
            size="lg"
          >
            <Link href="/quote-event" onClick={() => setIsOpen(false)}>
              <span>Cotiza tu evento ahora</span>
              <ArrowRight
                className={`
                  h-4 w-4 transition-transform duration-200
                  group-hover:translate-x-1
                `}
              />
            </Link>
          </Button>
        </div>

        <a
          className={`
            mb-2 flex items-center justify-center gap-2 rounded-lg py-2 text-sm
            font-medium text-muted-foreground transition-colors
            hover:text-primary
          `}
          href={`https://wa.me/52${BUSINESS_WHATSAPP_NUMBER}`}
          onClick={() => setIsOpen(false)}
          rel="noopener noreferrer"
          target="_blank"
        >
          <MessageCircle className="h-4 w-4" />
          Escríbenos por WhatsApp
        </a>
      </SheetContent>
    </Sheet>
  );
};
