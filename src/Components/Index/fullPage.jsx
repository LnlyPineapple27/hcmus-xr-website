import Main from "./Main";
import About from "./About";
import Contact from "./Contact";
import FAQ from "./FAQ";
import Footer from './Footer'

import React from 'react';

export default function fullPage() {
	return (
		<>
			<Main/>
			<About/>
			<Contact/>
			<FAQ/>
			<Footer/>
		</>
	);
};