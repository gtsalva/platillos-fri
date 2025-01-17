import { useEffect, useState } from 'react';
import useMeals from '../hooks/useMeals';
import usePaginator from '../hooks/usePaginator';
import { TBody } from './TBody';

const paginateMeals = (meals, currentPage, pageSize = 10) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return meals.slice(startIndex, endIndex);
};
const mealsPerPage = 10;

export const FoodsTable = () => {

    const { meals, loading, error } = useMeals();
    const { page, nextPage, previus } = usePaginator();
    const [paginatedMeals, setPaginatedMeals] = useState([])
    const [maxMealsPages, setMaxMealsPages] = useState(0)

    useEffect(() => {
        setMaxMealsPages(Math.ceil(meals.length / mealsPerPage))
        setPaginatedMeals(paginateMeals(meals, page, mealsPerPage))

    }, [loading, page])

    return (
        <>

            {loading ? <p className='text-center'>Cargando...</p> : null}
            {error ? <p className='text-center text-warning'>Error</p> : null}
            {
                paginatedMeals.length > 0 ? (
                    <>
                        <TBody platillos={paginatedMeals} />
                        <button className="btn btn-sm btn-primary mt-2" onClick={() => page > 1 ? previus() : null}>Anterior</button>
                        <span className="mx-2 mt-5">Pagina {page}</span>
                        <button className="btn btn-sm btn-primary mt-2" onClick={() => ((page +1) <= maxMealsPages) ? nextPage() : null}>Siguiente</button>
                    </>
                ) : null
            }

        </>
    )
}
