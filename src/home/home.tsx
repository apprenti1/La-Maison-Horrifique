//import React from 'react'

import Navbar from "../component/navbar/navbar.tsx";
import About from "@/home/about/about.tsx";

export default function Home() {
    return (<div className="w-screen text-ghostly-white font-inter overflow-x-hidden">
            <Navbar></Navbar>
            <div className="w-full">
                <h1>Hello World</h1>
                <About></About>
            </div>
        </div>
    )
}
