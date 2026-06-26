"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// An inline defined term: a dotted-underlined word whose explanation appears
// in a tooltip on hover / focus / tap.
export default function Term({ children, def }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="cursor-help font-[inherit] text-ink underline decoration-mut/50 decoration-dotted decoration-1 underline-offset-[3px] transition-colors hover:decoration-brand focus-visible:decoration-brand focus-visible:outline-none"
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent>{def}</TooltipContent>
    </Tooltip>
  );
}
