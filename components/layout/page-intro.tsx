import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";

type PageIntroProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageIntro({ title, description, children }: PageIntroProps) {
  return (
    <header className="border-b border-line">
      <Container className="py-16 md:py-24">
        <h1 className="type-h1 max-w-3xl">{title}</h1>
        {description ? (
          <p className="type-lead mt-6 max-w-2xl text-muted">{description}</p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </header>
  );
}
