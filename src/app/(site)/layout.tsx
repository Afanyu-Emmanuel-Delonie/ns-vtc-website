import Nav from "../components/Nav";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
      <BackToTop />
    </>
  );
}
