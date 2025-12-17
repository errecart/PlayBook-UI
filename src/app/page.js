import NavBar from "@/components/NavBar";
import HomePage from "./HomePage/HomePage";
import Footer from "@/components/Footer";
import "@/common/fonts.css";
import "@/common/spacing.css";
import "@/common/buttons.css";
import "@/common/radius.css";


export default function Home() {
  return (
    <>
    <NavBar />
    <HomePage />
    <Footer/>
    </>
  );
}
