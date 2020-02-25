import React from "react"

const Pizza = (props) => {
  let{topping, size, vegetarian} = props.pizza
  return(
    <tr>
      <td>{topping}</td>
      <td>{size}</td>
      <td>{vegetarian ? "vegetarian" : "not vegetarian"}</td>
      <td><button type="button" className="btn btn-primary" onClick={() => props.sendPizzaToEdit(props.pizza)}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
