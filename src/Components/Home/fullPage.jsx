import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import FAQ from "./FAQ";
import Footer from '../Footer/Footer'

import React from 'react';

export default function fullPage() {
	return (
		<>
			<Home/>
			<About/>
			<Contact/>
			<FAQ/>
			<Footer/>
		</>
	);
};