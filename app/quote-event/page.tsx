"use client";

import {
  Faq,
  HeaderSection,
  Progress,
  QuoteConfirmationDialog,
  QuoteStepRenderer,
  StickySummary,
} from "@/components/quote-event";
import { useQuoteEvent } from "@/hooks/event/use-quote-event";
import { useQuoteSubmit } from "@/hooks/event/use-quote-submit";
import { useQuoteWizard } from "@/hooks/event/use-quote-wizard";
import { useWhatsAppQuote } from "@/hooks/use-whatsapp";

export default function QuoteEventPage() {
  // Custom hooks for separation of concerns
  const { handleNext, handlePrev, progressRef, step } = useQuoteWizard();

  const { event, handleEventChange, isProductsStepValid, piecesTotal, total } =
    useQuoteEvent();

  const whatsAppMessage = useWhatsAppQuote(event, total);
  const {
    closeConfirmationDialog,
    eventNumber,
    handleSubmit,
    showConfirmationDialog,
    submittedEvent,
  } = useQuoteSubmit();

  return (
    <div
      className={`
        mx-auto grid h-full gap-6 bg-[hsl(20_60%_96%)] p-3
        xl:grid-cols-[1fr_380px] xl:gap-8 xl:px-40 xl:py-8
      `}
    >
      {/* Main */}
      <div
        className={`
          space-y-3
          sm:space-y-4
        `}
      >
        <HeaderSection />
        <div className="scroll-mt-[85px]" ref={progressRef}>
          <Progress step={step} />
        </div>

        {/* Step cards */}
        <QuoteStepRenderer
          event={event}
          isProductsStepValid={isProductsStepValid}
          onEventChange={handleEventChange}
          onNext={handleNext}
          onPrev={handlePrev}
          onSubmit={() => handleSubmit(event)}
          piecesTotal={piecesTotal}
          step={step}
          total={total}
          whatsAppMessage={whatsAppMessage}
        />

        {/* FAQ */}
        <Faq />
      </div>

      {/* Sidebar summary (desktop) */}
      <aside
        className={`
          hidden
          xl:block
        `}
      >
        <StickySummary event={event} total={total} />
      </aside>

      {/* Confirmation Dialog */}
      {submittedEvent && (
        <QuoteConfirmationDialog
          event={submittedEvent}
          eventNumber={eventNumber}
          isOpen={showConfirmationDialog}
          onClose={closeConfirmationDialog}
          total={total}
        />
      )}
    </div>
  );
}
