import { Container } from "@/components/ui/container";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <Container className="max-w-[760px] py-14 md:py-16">
      <h1 className="mb-2 text-[30px] md:text-[32px]">{title}</h1>
      <p className="mb-8 font-mono text-[12.5px] text-grey-light">{updated}</p>
      <div className="space-y-4 [&_h2]:mt-8 [&_h2]:mb-2.5 [&_h2]:text-lg [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-ink-soft [&_ul]:space-y-2 [&_ul]:pl-1 [&_li]:relative [&_li]:pl-5 [&_li]:text-[15px] [&_li]:leading-relaxed [&_li]:text-ink-soft [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:content-['–'] [&_li]:before:text-verified [&_li]:before:font-bold [&_a]:font-semibold [&_a]:text-verified">
        {children}
      </div>
    </Container>
  );
}
