import { HomeHeader } from "@/components/home/home-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="home-shell flex min-h-dvh flex-col">
      <HomeHeader />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
