import { useState, useEffect } from 'react';

const mealsNumber = 30;

const useMeals = () => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setError('Failed to fetch mealsNumber unique meals.');
            } else {
                setMeals(Array.from(uniqueMeals.values()));
            }
            setLoading(false);
        };

        fetchMeals();
    }, []);

    return { meals, loading, error };
};

export default useMeals;
