import React from "react";
import Pagination from "../component/pagination";

export default function ListView(props){
    // console.log(props);
    // const { pagename } = props;
    return <div>
        <h1>列表视图</h1>
        <Pagination {...props} />
    </div>
}