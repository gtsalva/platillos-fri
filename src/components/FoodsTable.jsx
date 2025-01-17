import useMeals from '../hooks/useMeals';
import usePaginator from '../hooks/usePaginator';
import { TBody } from './TBody';
import usePaginatedMeals from '../hooks/usePaginatedMeals';
import { useState } from 'react';

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

                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <button className="btn btn-sm btn-primary mt-2" onClick={() => page > 1 ? previus() : null}>Anterior</button>
                                <span className="mx-2 mt-5">Pagina {page} de {maxMealsPages}</span>
                                <button className="btn btn-sm btn-primary mt-2" onClick={() => ((page + 1) <= maxMealsPages) ? nextPage() : null}>Siguiente</button>

                            </div>
                            <div className="col-auto">
                                <select className="form-select form-select-sm mt-2" defaultValue={10} onChange={(e) => (setMealsPerPage(e.target.value)) }>
                                    <option value={10}>10</option>
                                    <option value={5}>5</option>
                                    <option value={3}>3</option>
                                </select>
                            </div>
                            <div className="col-auto">
                                <span id="passwordHelpInline" className="form-text text-white text-strong">
                                    platillos por pagina
                                </span>
                            </div>
                        </div>

                    </>
                ) : null
            }

        </>
    )
}
