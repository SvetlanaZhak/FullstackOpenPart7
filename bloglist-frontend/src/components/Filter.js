import React from 'react';

const Filter = ({ filterTitle, onFilterChange }) => {
    return (
        <div>
            Filter by title: <input value={filterTitle} onChange={onFilterChange} />
        </div>
    );
};

export default Filter;