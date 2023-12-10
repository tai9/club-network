import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { LayoutProps } from "@/types/common";
import { Space_Grotesk } from "next/font/google";

const font = Space_Grotesk({ subsets: ["latin"] });
export const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div
      className={`relative flex flex-col grow min-h-screen ${font.className}`}
    >
      <Header />

      <main className="grow">{children}</main>

      <Footer />
    </div>
  );
};
