import Header from "../components/ui/header";
import Compatibility from "../home/compatibility";
import Newsletter from "../home/call-to-download";
import Footer from "../components/ui/footer";
import React from "react";
import Pitch from "../home/pitch";
import Hero from "../home/hero";

export default function Root() {
	return (
		<div>
			<Header />
			<Hero />
			<Pitch />
			<Compatibility />
			<Newsletter />
			<Footer />
		</div>
	);
}
