import React from "react";
import Pagination from "react-bootstrap/Pagination";

const PaginationComp=()=>{
    return(
        <Pagination>
            <Pagination.Prev/>
            <Pagination.Item>All</Pagination.Item>
            <Pagination.Item>Sent</Pagination.Item>
            <Pagination.Item>Scheduled</Pagination.Item>
            {/* <Pagination.Next/> */}

        </Pagination>
    )
}
export default PaginationComp
