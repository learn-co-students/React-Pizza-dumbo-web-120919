import React from "react"

const PizzaForm = (props) => {
  let {topping, size, vegetarian} = props.pizzaBeingEdited
  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" className="form-control" placeholder="Pizza Topping" value={
                topping
              }
              onChange={props.toppingEdit}
              />
        </div>
        <div className="col">
          <select value={size} className="form-control" onChange={props.sizeEdit}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Vegetarian" checked={vegetarian} onChange={props.vegEdit}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Not Vegetarian" checked={!vegetarian} onChange={props.vegEdit}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={props.savePizza}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
