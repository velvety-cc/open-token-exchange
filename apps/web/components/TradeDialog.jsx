"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MODELS = [
  "DeepSeek V4",
  "Qwen3 Coder 480B",
  "GLM 5.2",
  "Kimi K2.6",
  "Mistral Medium 3.5",
];
const EXPIRIES = ["1 month", "3 months", "6 months", "12 months", "Open / flexible"];

const COPY = {
  sell: {
    eyebrow: "Supply side",
    title: "Sell inference forward",
    desc: "Tell us what you can supply. We match you with buyers ready to lock it in.",
    amountLabel: "Volume you can guarantee",
    amountPlaceholder: "e.g. 500M output tokens / month",
    modelsLabel: "Which models?",
    cta: "Request to sell",
  },
  buy: {
    eyebrow: "Demand side",
    title: "Lock in your token price",
    desc: "Tell us your expected volume, models, and timeframe. We match you with suppliers ready to guarantee the price.",
    amountLabel: "Expected monthly volume",
    amountPlaceholder: "e.g. 200M output tokens / month",
    modelsLabel: "Which models?",
    cta: "Get my price",
  },
};

export default function TradeDialog({ mode = "buy", children }) {
  const c = COPY[mode];
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [doneEmail, setDoneEmail] = useState("");
  const [models, setModels] = useState(() => new Set());
  const [other, setOther] = useState(false);
  const [expiry, setExpiry] = useState("");

  function toggleModel(m) {
    setModels((prev) => {
      const next = new Set(prev);
      if (next.has(m)) next.delete(m);
      else next.add(m);
      return next;
    });
  }

  function resetSoon() {
    setTimeout(() => {
      setDone(false);
      setModels(new Set());
      setOther(false);
      setExpiry("");
    }, 220);
  }

  function onOpenChange(v) {
    setOpen(v);
    if (!v) resetSoon();
  }

  function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();
    const picked = [...models];
    if (other) picked.push(`Other: ${String(fd.get("other") || "").trim()}`);

    if (picked.length === 0) {
      toast.error("Pick at least one model");
      return;
    }
    if (!expiry) {
      toast.error("Choose an expiration");
      return;
    }

    // No backend wired yet: capture the intent and confirm.
    console.log("[Open Intelligence trade request]", {
      mode,
      email,
      amount: fd.get("amount"),
      models: picked,
      expiry,
      notes: fd.get("notes"),
    });

    setDoneEmail(email);
    setDone(true);
    toast.success("Request received", {
      description: `We'll reach out at ${email}.`,
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        {done ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <div className="flex size-11 items-center justify-center rounded-full bg-brand-tint text-brand-ink">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <DialogTitle>Request received</DialogTitle>
            <DialogDescription className="max-w-xs">
              Thanks. We&rsquo;ll reach out at{" "}
              <span className="text-ink">{doneEmail}</span> to size the trade
              and match the other side.
            </DialogDescription>
            <DialogClose asChild>
              <Button className="mt-2 rounded-full" variant="outline">
                Done
              </Button>
            </DialogClose>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{c.title}</DialogTitle>
              <DialogDescription>{c.desc}</DialogDescription>
            </DialogHeader>

            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor={`${mode}-email`}>Email</Label>
                <Input
                  id={`${mode}-email`}
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`${mode}-amount`}>{c.amountLabel}</Label>
                <Input
                  id={`${mode}-amount`}
                  name="amount"
                  required
                  placeholder={c.amountPlaceholder}
                />
              </div>

              <div className="grid gap-2.5">
                <Label>{c.modelsLabel}</Label>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {MODELS.map((m) => (
                    <label
                      key={m}
                      className="flex cursor-pointer items-center gap-2.5 text-sm text-ink2"
                    >
                      <Checkbox
                        checked={models.has(m)}
                        onCheckedChange={() => toggleModel(m)}
                      />
                      {m}
                    </label>
                  ))}
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink2">
                    <Checkbox
                      checked={other}
                      onCheckedChange={(v) => setOther(Boolean(v))}
                    />
                    Other
                  </label>
                </div>
                {other && (
                  <Input
                    name="other"
                    placeholder="Which model(s)?"
                    className="mt-1"
                  />
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`${mode}-expiry`}>Price guaranteed for</Label>
                <Select value={expiry} onValueChange={setExpiry}>
                  <SelectTrigger id={`${mode}-expiry`}>
                    <SelectValue placeholder="Select a period" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPIRIES.map((x) => (
                      <SelectItem key={x} value={x}>
                        {x}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`${mode}-notes`}>
                  Anything else?{" "}
                  <span className="font-normal text-faint">(optional)</span>
                </Label>
                <Textarea
                  id={`${mode}-notes`}
                  name="notes"
                  rows={2}
                  placeholder="Timing, constraints, anything specific..."
                />
              </div>

              <DialogFooter className="mt-1">
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="rounded-full">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="rounded-full">
                  {c.cta}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
