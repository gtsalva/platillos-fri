import { useState } from "react"

const usePaginator = (initialValue = 1) => { 

    const [page, setPage] = useState(initialValue)

    return {
        page,
        nextPage: () => setPage(page + 1),
        previus: () => setPage(page - 1)
    }
}

export default usePaginator;