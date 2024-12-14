import { Fragment } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <div>
        <main>{children}</main>
      </div>
    </Fragment>
  );
};

export default Layout;
