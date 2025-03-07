import Header from "../components/ui/header"
import Footer from "../components/ui/footer"
import DownloadPage from "../download/download"
import React from "react";
import ContactPage from "../contatus/contactus";

export default function ContactRoute() {
  return (
    <div>
      <Header />
      <ContactPage />
      <Footer />
    </div>
  )
}

