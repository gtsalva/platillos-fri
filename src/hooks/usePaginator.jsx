import { useState } from "react"

const usePaginator = (initialValue = 1) => { 

    const [page, setPage] = useState(initialValue)
    const [maxPage, setMaxPage] = useState(0)

    const setMaxNumberPage = (value)=> {
        setMaxPage(value)
    }

    const nextPage = () => {
        const tempPage = page + 1;
        if( tempPage  <= maxPage){
            setPage(page + 1)
        }
    }

    return {
        page,
        nextPage,
        previus: () => setPage(page - 1),
        setMaxNumberPage 
    }
}

export default usePaginator;