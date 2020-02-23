import React, { Component, Fragment } from 'react';

import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {

  state = {
    allPizzas: [],
    selectedPizza: {
      id: null,
      topping: "",
      size: "",
      vegetarian: true
    }
  }

  // initial fetch of that hot n' fresh 'za
  componentDidMount() {
    this.initialPizzaFetch()
  }
  initialPizzaFetch = () => {
    fetch('http://localhost:3000/pizzas')
    .then( r => r.json() )
    .then( pizzas => {
      this.setState({
        allPizzas: pizzas
      })
    })
  }

  // handles the edit button being clicked on a pizza
  handleEditButtonClick = (pizza) => {
    this.setState({
      selectedPizza: pizza
    })
  }

  // sets state dynamically for the selected pizza as it's changed in the form
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
  handleVegetarianChange = (newVegetarian) => {
    if (newVegetarian === "Vegetarian") {
      this.setState({
        selectedPizza: {
          ...this.state.selectedPizza,
          vegetarian: true
        }
      })
    } else if (newVegetarian === "Not Vegetarian") {
      this.setState({
        selectedPizza: {
          ...this.state.selectedPizza,
          vegetarian: false
        }
      })
    }
  }

  // updates pizza in the backend
  handlePizzaUpdate = () => {
    fetch(`http://localhost:3000/pizzas/${this.state.selectedPizza.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': "application/json",
        'Accepts': "application/json"
      },
      body: JSON.stringify(this.state.selectedPizza)
    })
    .then( r => r.json() )
    .then( pizza => {
      this.initialPizzaFetch()
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
          selectedPizza={this.state.selectedPizza} 
          handleToppingChange={this.handleToppingChange} 
          handleSizeChange={this.handleSizeChange}
          handleVegetarianChange={this.handleVegetarianChange}
          handlePizzaUpdate={this.handlePizzaUpdate}
        />
        <PizzaList 
          allPizzas={this.state.allPizzas} 
          handleEditButtonClick={this.handleEditButtonClick} 
        />
      </Fragment>
    );
  }
}

export default App;
