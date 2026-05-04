import { Header } from "./Header";
import { Footer } from "./Footer";

/**
 * The shared shell from the original portfolio:
 * a max-width container with the sticky header card at top,
 * page content in the middle, footer card at bottom.
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex max-w-screen-2xl flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
