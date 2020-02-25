import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  state = {
    pizzas: [],
    pizzaBeingEdited: {
      id: null,
      topping: "",
      size: "",
      vegetarian: null
    }
  }
  //intial fetch of pizzas
  componentDidMount(){
    fetch('http://localhost:3000/pizzas')
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      this.setState({
        pizzas: data
      })
    })
  }
  //send new pizza to the edit form
  sendPizzaToEdit = (pizza) => {
    this.setState({
      pizzaBeingEdited: pizza
    })
  }
  //edit pizzain front end and backend
  savePizza = () => {
    fetch(`http://localhost:3000/pizzas/${this.state.pizzaBeingEdited.id}`, {
      'method': 'PATCH',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify(this.state.pizzaBeingEdited)
    })
    .then(this.savePizzaInState())
  }
  savePizzaInBackend = () => {
    
  }
  //change pizza in state
  savePizzaInState = () => {
    let tempPizza = this.state.pizzas.map(pizza => {
      if(pizza.id === this.state.pizzaBeingEdited.id){
        return this.state.pizzaBeingEdited
      }else{
        return pizza
      }
    })
    this.setState({
      pizzas: tempPizza
    })
  }
  //edit pizza topping
  toppingEdit = e => {
    this.setState({
      pizzaBeingEdited: {
        ...this.state.pizzaBeingEdited,
        topping: e.target.value
      }
    })
  }
  //edit pizza size
  sizeEdit = e => {
    this.setState({
      pizzaBeingEdited: {
        ...this.state.pizzaBeingEdited,
        size: e.target.value
      }
    })
  }
  //edit pizza vegetarian
  vegEdit = e => {
    let vegVal = e.target.value === "Vegetarian" ? true : false
    this.setState({
      pizzaBeingEdited: {
        ...this.state.pizzaBeingEdited,
        vegetarian: vegVal
      }
    })
  }
  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizzaBeingEdited={this.state.pizzaBeingEdited} 
        savePizza={this.savePizza} 
        toppingEdit={this.toppingEdit}
        sizeEdit={this.sizeEdit}
        vegEdit={this.vegEdit}/>
        <PizzaList pizzas={this.state.pizzas} sendPizzaToEdit={this.sendPizzaToEdit}/>
      </Fragment>
    );
  }
}

export default App;
