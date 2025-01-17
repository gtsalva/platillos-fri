import { useState, useEffect } from "react"

const paginateMeals = (meals, currentPage, pageSize) => {

    const tempMeals = [
        ... meals
    ]

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return tempMeals.slice(startIndex, endIndex);
};

const usePaginatedMeals = ({meals, loading, page, mealsPerPage}) => {
    
    const pageSize = parseInt(mealsPerPage)

    const [paginatedMeals, setPaginatedMeals] = useState([])
    const [maxMealsPages, setMaxMealsPages] = useState(0)

    useEffect(() => {
        setPaginatedMeals([])
        setMaxMealsPages(Math.ceil(meals.length / pageSize))
        setPaginatedMeals(paginateMeals(meals, page, pageSize))    
    }, [loading, page, mealsPerPage])

    return {
        paginatedMeals,
        maxMealsPages
    }
}

export default usePaginatedMeals;