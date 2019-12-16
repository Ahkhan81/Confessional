import React from 'react';
import { Pagination } from 'react-bootstrap';

export const Paging = (props) => {
    const { page, totalItems, itemsPerPage, onPageChange } = props;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    function handlePageChange(newPageIndex) {
        if (newPageIndex === page) {
            return;
        }
        
        onPageChange(newPageIndex);
    }

    const pageNumbers = [];
    let start = page - 2;
    let end = page + 2;
    if (start < 0) {
        start = 0;
        end = 4;
    }
    if (end >= totalPages) {
        start = totalPages - 5;
        end = totalPages - 1;
    }
    if (start < 0) {
        start = 0;
    }

    for (let i = start; i <= end; i++) {
        pageNumbers.push(
            <Pagination.Item
                key={i} 
                active={i === page} 
                onClick={() => handlePageChange(i)}
            >
                    {i+1}
            </Pagination.Item>
        );
    }
    if (pageNumbers.length === 0) {
        pageNumbers.push(
            <Pagination.Item key={1} active>
                1
            </Pagination.Item>
        );
    }

    const backwardNav = page === 0;
    const forwardNav = page === totalPages - 1 || totalPages === 0;
    return (
        <Pagination className="mx-auto">
            <Pagination.First disabled={backwardNav} onClick={() => handlePageChange(0)} />
            <Pagination.Prev disabled={backwardNav} onClick={() => handlePageChange(page - 1)} />
            
            {pageNumbers}

            <Pagination.Next disabled={forwardNav} onClick={() => handlePageChange(page + 1)} />
            <Pagination.Last disabled={forwardNav} onClick={() => handlePageChange(totalPages - 1)} />
        </Pagination>
    );
};