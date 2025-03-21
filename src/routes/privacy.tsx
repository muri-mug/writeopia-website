import PrivacyPolicy from "../privacy/privacy";
import Footer from "../components/ui/footer";
import Header from "../components/ui/header";
import React from "react";
import AddressSection from "../components/ui/address-section";

export default function Privacy() {
	return (
		<div>
			<Header />
			<PrivacyPolicy />
			<AddressSection />
			<Footer />
		</div>
	);
}
