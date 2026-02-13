import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Root() {
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <Navbar />
      </header>
      <main className="flex-1 pt-16 pb-28">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Root;
