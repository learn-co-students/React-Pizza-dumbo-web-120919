import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {

  state = {
    pizzas: [],
    selectedPizza: {
      id: null,
      topping: "",
      size: "",
      vegetarian: true
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/pizzas")
    .then(r => r.json())
    .then(pizzas => {
      this.setState({
        pizzas
      })
    })
  }


  handleEditPizza = (pizza) => {
    this.setState({
      selectedPizza: pizza
    })
  }

  handleToppingChange = (newTopping) => {
    this.setState({
      selectedPizza: {
        ...this.state.selectedPizza, 
        topping: newTopping
      }
    })
  }

  handleSizeChange = (newSize) => {
    this.setState({
      selectedPizza: {
        ...this.state.selectedPizza, 
        size: newSize
      }
    })
  }

  handleVeggieChange = (veggieValue) => {
    if (veggieValue === "Vegetarian") {
      this.setState({
        selectedPizza: {
          ...this.state.selectedPizza, 
          vegetarian: true
        }
      })
    }

    if (veggieValue === "Not Vegetarian") {
      this.setState({
        selectedPizza: {
          ...this.state.selectedPizza, 
          vegetarian: false
        }
      })
    }
  }

  handlePizzaSubmit = () => {
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.selectedPizza)
    }
    
    fetch(`http://localhost:3000/pizzas/${this.state.selectedPizza.id}`, config)
    .then(r => r.json())
    .then(updatedPizza => {
      this.componentDidMount()
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm selectedPizza={this.state.selectedPizza}
                   handleToppingChange={this.handleToppingChange} 
                   handleSizeChange={this.handleSizeChange}
                   handleVeggieChange={this.handleVeggieChange}
                   handlePizzaSubmit={this.handlePizzaSubmit} />
        <PizzaList pizzas={this.state.pizzas} 
                   handleEditPizza={this.handleEditPizza} />
      </Fragment>
    );
  }
}

export default App;
