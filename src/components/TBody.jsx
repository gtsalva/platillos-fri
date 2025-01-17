import React from 'react'

export const TBody = ({platillos}) => {
  return (
    <>
        <table className='table table-dark table-striped'>
            <tbody>
                <tr>
                    <th>Platillo</th>
                    <th>Detalles</th>
                    <th>Imagen</th>
                </tr>
            
                {
                    platillos.map(({idMeal,strMeal, strCategory, strArea, strMealThumb, strYoutube }) => (
                        <tr key={idMeal}>
                            <td>{strMeal}</td>
                            <td>
                                <p>Categoria: {strCategory}</p>
                                <p>Area: {strArea}</p>
                                <p>Youtube: <a href={strYoutube} target="_blank">Watch Video</a></p>
                            </td>
                            <td>
                                <img 
                                    src={strMealThumb} 
                                    alt={strMeal} 
                                    className="img-thumbnail rounded"
                                    style={{width: 200}}
                                />
                            </td>
                        </tr>
                    ))
                }
            </tbody>

            

        </table>

    </>
  )
}
