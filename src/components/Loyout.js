import * as React from "react";
import { Link } from "gatsby";
import Footer from "./Footer"
import Header from "./Header"
const Layout = ({pageTitle, childern}) => {
  return (
    <div>
      <Header/>
      <main>
        <h1>{pageTitle}</h1>
        {childern}
      </main>
    <Footer/>
    </div>
  )
}

export default Layout;
