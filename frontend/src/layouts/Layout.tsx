import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

import { containerClass } from "../utils";

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />

      <div className={`${containerClass}`}>
        <SearchBar />
      </div>
      <div className={`${containerClass} py-10 flex-1`}>{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
