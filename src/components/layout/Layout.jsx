import { Fragment } from "react";

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
