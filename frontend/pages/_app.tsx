import React from 'react';
import {AppProps} from "next/app";
import "@/styles/index.scss"

export default function({ Component, pageProps}: AppProps) {
	return(<>
		<Component {...pageProps}/>
		</>)
}