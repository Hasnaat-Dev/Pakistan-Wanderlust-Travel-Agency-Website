import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/** Standard page section: consistent vertical rhythm + optional heading block. */
export function Section({
  eyebrow,
  title,
  description,
  children,
  className,
  align = "left",
  id,
}: {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  children?: ReactNode;
  className?: string;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-5 py-20 sm:px-8 lg:py-28", className)}>
      <div className="mx-auto w-full max-w-6xl">
        {(eyebrow || title || description) && (
          <Reveal className={cn("mb-12 max-w-2xl", align === "center" && "mx-auto text-center")}>
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {title && <h2 className="text-3xl leading-tight text-balance sm:text-4xl lg:text-5xl">{title}</h2>}
            {description && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{description}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}