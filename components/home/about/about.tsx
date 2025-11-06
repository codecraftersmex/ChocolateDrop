import { AboutContent } from "./about-content";
import { AboutHighlights } from "./about-highlights";
import { AboutImage } from "./about-image";
import { AboutStats } from "./about-stats";

interface AboutProps {
  className?: string;
}

export function About({ className }: AboutProps) {
  return (
    <section
      className={`
        relative flex items-center overflow-hidden py-16
        lg:py-24
        ${className || ""}
      `}
    >
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`
            absolute top-10 right-20 h-28 w-28 rounded-full bg-gradient-to-br
            from-amber-200/20 to-orange-200/20 blur-2xl
          `}
        />
        <div
          className={`
            absolute bottom-20 left-16 h-36 w-36 rounded-full bg-gradient-to-br
            from-orange-200/15 to-rose-200/15 blur-2xl
          `}
        />
      </div>
      <div
        className={`
          container mx-auto max-w-7xl px-4
          sm:px-6
          lg:px-8
        `}
      >
        <div
          className={`
            grid gap-12
            lg:grid-cols-2 lg:items-center
          `}
        >
          {/* Main Content */}
          <div className="space-y-6">
            <AboutContent />
            <AboutHighlights />
          </div>

          {/* Image Section */}
          <div className="space-y-6">
            <AboutImage />
            <AboutStats />
          </div>
        </div>
      </div>
    </section>
  );
}
