import useMeals from '../hooks/useMeals';
import usePaginator from '../hooks/usePaginator';
import { TBody } from './TBody';
import usePaginatedMeals from '../hooks/usePaginatedMeals';
import { useState } from 'react';
import { Controllers } from './Controllers';

export const FoodsTable = () => {

    const { meals, loading, error } = useMeals();
    const { page, nextPage, previus } = usePaginator();
    const [mealsPerPage, setMealsPerPage] = useState(10)
    const { paginatedMeals, maxMealsPages } = usePaginatedMeals({ meals, loading, page, mealsPerPage })

    return (
        <>

            {loading ? <p className='text-center'>Cargando...</p> : null}
            {error ? <p className='text-center text-warning'>Error</p> : null}
            {
                paginatedMeals.length > 0 ? (
                    <>
                        <TBody platillos={paginatedMeals} />

                        <Controllers 
                            page={page}
                            maxMealsPages={maxMealsPages}
                            previus={previus}
                            nextPage={nextPage}
                            setMealsPerPage={setMealsPerPage}
                        />
                    </>
                ) : null
            }

        </>
    )
}
