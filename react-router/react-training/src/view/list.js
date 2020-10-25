import React from "react";
import ListNav from "../component/list_nav";
import List from "../component/list";
import Pagination from "../component/pagination";

export default function ListView(props){
    return <div>
        <ListNav {...props} />
        <List {...props} />
        <Pagination {...props} />
    </div>
}