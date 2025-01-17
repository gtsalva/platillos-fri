import { useState, useEffect } from "react"

const paginateMeals = (meals, currentPage, pageSize = 10) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return meals.slice(startIndex, endIndex);
};

const usePaginatedMeals = ({meals, loading, page, mealsPerPage}) => { 

    const [paginatedMeals, setPaginatedMeals] = useState([])
    const [maxMealsPages, setMaxMealsPages] = useState(0)

    useEffect(() => {

        setMaxMealsPages(Math.ceil(meals.length / mealsPerPage))
        setPaginatedMeals(paginateMeals(meals, page, mealsPerPage))
    
    }, [loading, page])

    return {
        paginatedMeals,
        maxMealsPages
    }
}

export default usePaginatedMeals;