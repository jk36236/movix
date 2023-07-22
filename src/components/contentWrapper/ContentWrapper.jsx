import React from "react";

import "./style.scss";

//we have just created a div and make it a h.o.c and whatever we pass(div,components..) in contentwrapper will get wrapped inside the div, and this div basically centers the content i.e create equal space on both sides and we wil use this wrapper thrpughout the application
const ContentWrapper = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;