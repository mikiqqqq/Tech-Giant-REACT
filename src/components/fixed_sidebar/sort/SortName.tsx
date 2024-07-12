import React, { useEffect, useState } from "react";
import { FilterOptions } from "../../MainContainerData";
import style from './SortButtons.module.css';

interface Props {
    onFilterOptions: (filterOptions: FilterOptions) => void;
    filterOptions: FilterOptions;
    baseColor: string;
    backgroundColor: string;
    onSortOrderChange: (sortOrder: string) => void; // Add this prop
}

const SortName: React.FunctionComponent<Props> = props => {
    const [isActive, setIsActive] = useState<string>(props.filterOptions.sortOrder || 'ASC');

    const handleClick = (sortOrder: string) => {
        if (isActive !== sortOrder) {
            setIsActive(sortOrder);
            const updatedFilterOptions = {
                ...props.filterOptions,
                sortBy: "NAME",
                sortOrder: sortOrder
            };
            props.onFilterOptions(updatedFilterOptions);
            props.onSortOrderChange(sortOrder); // Call this when sort order changes
        }
    };

    return (
        <>
            <button 
                style={{
                    backgroundColor: isActive === "ASC" ? props.baseColor : props.backgroundColor,
                    color: isActive === "ASC" ? props.backgroundColor : props.baseColor,
                    fontWeight: isActive === "ASC" ? "bold" : ""
                }}
                onClick={() => handleClick("ASC")} 
                className={`${style.choose_button} ${isActive === "ASC" ? style.selected : ""}`}
            >
                A - Z
            </button>
    
            <button 
                style={{
                    backgroundColor: isActive === "DESC" ? props.baseColor : props.backgroundColor,
                    color: isActive === "DESC" ? props.backgroundColor : props.baseColor,
                    fontWeight: isActive === "DESC" ? "bold" : ""
                }}
                onClick={() => handleClick("DESC")} 
                className={`${style.choose_button} ${isActive === "DESC" ? style.selected : ""}`}
            >
                Z - A
            </button>
        </>
    );
};

export default SortName;