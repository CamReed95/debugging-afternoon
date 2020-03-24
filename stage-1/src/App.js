import React, { Component } from "react";
import StoreFront from "./Components/StoreFront/StoreFront";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import NavBar from "./Components/NavBar/NavBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      showCart: false
    };
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.navigate = this.navigate.bind(this);
  }
  componentDidMount() {
    axios  
      .get("https://practiceapi.devmountain.com/products/")
      .then(response => {
        this.setState({
          products: response.data
        });
      });
  }
// Riley's answer: if this.props.addTocart is not a func, see where you're passing it down. in the storefront component look at it's parent and what props are being pass down to its component. Also in sotrefront define props either in the constructor or if you make it into a functionl component in needs to take in storefront. You need to define props in a structire 

  addToCart(item) {
    this.setState({
      cart: [...this.state.cart, item]
    });
  }
  removeFromCart(index) {
    let cartCopy = this.state.cart.slice();
    cartCopy.splice(index, 1);
    this.setState({
      cart: cartCopy
    });
  }
  navigate(location) {
    if (location === "cart") {
      this.setState({
        showCart: true
      });
    } else {
      this.setState({
        showCart: false
      });
    }
  }
  render() {
    const { products, showCart } = this.state;
    return (
      <div className="App">
        <NavBar navigate={this.navigate} />
        <div className="main-container">
          {showCart ? (
            <ShoppingCart cart={this.state.cart} />
          ) : (
            <StoreFront products={products} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
