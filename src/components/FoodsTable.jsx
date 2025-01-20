import { TBody } from './TBody';
import { useState } from 'react';
import { Controllers } from './Controllers';
import useMealsService from '../hooks/useMealsService';

export const FoodsTable = () => {

    const [mealsPerPage, setMealsPerPage] = useState(10)
    const {  loading, error, paginatedMeals,maxPages, page, nextPage, previousPage  } = useMealsService(mealsPerPage, 1)
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
                            maxMealsPages={maxPages}
                            previus={previousPage}
                            nextPage={nextPage}
                            setMealsPerPage={setMealsPerPage}
                        />
                    </>
                ) : null
            }

        </>
    )
}
