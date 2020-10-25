import React from "react";
import List from "../component/list";
import Pagination from "../component/pagination";

export default function ListView(props){
    return <div>
        <List {...props} />
        <Pagination {...props} />
    </div>
}