import { useState, useEffect } from "react";

const mealsNumber = 30;

const paginateMeals = (meals, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return meals.slice(startIndex, endIndex);
};

const useMealsPagination = (mealsPerPage = 10, initialPage = 1) => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(initialPage);
    const [paginatedMeals, setPaginatedMeals] = useState([]);
    const [maxPages, setMaxPages] = useState(0);

    useEffect(() => {
        const fetchMeals = async () => {
            const uniqueMeals = new Map();
            let attempts = 0;

            while (uniqueMeals.size < mealsNumber && attempts < 100) {
                try {
                    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    const meal = data.meals[0];

                    const extractedMeal = {
                        idMeal: meal.idMeal,
                        strMeal: meal.strMeal,
                        strCategory: meal.strCategory,
                        strArea: meal.strArea,
                        strMealThumb: meal.strMealThumb,
                        strYoutube: meal.strYoutube,
                    };

                    if (!uniqueMeals.has(extractedMeal.idMeal)) {
                        uniqueMeals.set(extractedMeal.idMeal, extractedMeal);
                    }
                } catch (err) {
                    setError(err.message);
                    break;
                }
                attempts++;
            }

            if (uniqueMeals.size < mealsNumber) {
                setError('Failed to fetch the required number of unique meals.');
            } else {
                setMeals(Array.from(uniqueMeals.values()));
            }
            setLoading(false);
        };

        fetchMeals();
    }, []);

    useEffect(() => {
        const pageSize = parseInt(mealsPerPage);
        setMaxPages(Math.ceil(meals.length / pageSize));
        setPaginatedMeals(paginateMeals(meals, page, pageSize));
    }, [meals, page, mealsPerPage]);

    useEffect(() => {
        if (page > maxPages) {
            setPage(1);
        }
    }, [page, maxPages]);

    return {
        meals,
        loading,
        error,
        paginatedMeals,
        maxPages,
        page,
        nextPage: () => setPage((prev) => Math.min(prev + 1, maxPages)),
        previousPage: () => setPage((prev) => Math.max(prev - 1, 1)),
    };
};

export default useMealsPagination;
