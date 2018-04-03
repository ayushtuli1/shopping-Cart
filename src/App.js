import React, { Component } from 'react';
import './App.css';
import data from './data.json'
const img =require("./images/image1.png")
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      products:data,
      cartData:[],
      total:0
    }
}
  isInCart = (item) =>{ 
    return this.state.cartData.indexOf(item) !== -1;
  }
  removeFromCart = (item) =>  { 
    // let filteredArray = this.state.cartData.filter(data => data !==item)
    // console.log(filteredArray)
    var array = this.state.cartData;
    var index = array.indexOf(item)
    array.splice(index, 1);
    this.setState({cartData: array}, () => {
      this.setState({total: this.state.total-(item.Price)}, () => {
        localStorage.setItem("cartitems", JSON.stringify(this.state.cartData));
        localStorage.setItem("cartvalue", this.state.total)})
  });
  }
  addToCart = (item) => { 
      this.setState({cartData: [...this.state.cartData, item]}, () => {
        this.setState({total: this.state.total+item.Price}, () => {
          localStorage.setItem("cartitems", JSON.stringify(this.state.cartData));
          localStorage.setItem("cartvalue", this.state.total)})
    });
  }
  componentWillMount() {
    var cacheddata = JSON.parse(localStorage.getItem("cartitems"));
    if (cacheddata) {
      this.setState({cartData: cacheddata}, () => {
      this.setState({total: parseInt(localStorage.getItem("cartvalue"))})
      });
       return;
    }
  }
  render() {
    const { products } = this.state;
    console.log("render",this.state)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{`Masala and Spices (${products.length} Items)`}</h1>
        </header>
        <div className="container">
            <div className="product-Parentblock"> 
              { products.map((item,index) =>
                <div className="product-block"> 
                 <img  className="product-image" alt="" src={item["ProductImage"]} ></img>
                  <div>{item["ProductName"]} </div>
                  <div>{item["BrandName"]}</div>
                  <div>{item[ "PackingDetail"]}</div>
                  <div>Rs {item["Price"]}</div>
                  {this.state.cartData.indexOf(item) === -1 &&
                  <button className='btn btn-primary' onClick={() => this.addToCart(item)}>
                   Add to cart
                  </button>
                  }
                  {this.state.cartData.indexOf(item) !== -1 &&
                  <div>
                    <button className='btn btn-danger' onClick={() => this.removeFromCart(item)}>
                      Remove
                    </button>
                     In Cart 
                    <button className='btn btn-primary' onClick={() => this.addToCart(item)}>
                      Add to cart
                    </button>
                  </div>
                  }
                </div>
              ) }
            </div>
            { this.state.cartData.length>0 &&
            <div className="cartblock"> 
               <b>Your Cart Summary</b>
              <div className="cart-header">
                <div className="cart-headerdata">
                Items in Cart
                </div>
                <div className="cart-headerdata">
                Total Rs
              </div>
              </div>
              <div className="cart-header">
                <div className="cart-headerdata">
               {this.state.cartData.length}
                </div>
                <div className="cart-headerdata">
                {this.state.total}
              </div>
              </div>
              <hr/>

              <div className="cart-header">
                <div className="cart-headerdata">
                Items
                </div>
                <div className="cart-headerdata">
                Quanity
                </div>
                <div className="cart-headerdata">
                Price
                </div>
                <div className="cart-headerdata">
                Action
                </div>
              </div>

              { this.state.cartData.map((item,index) =>
              <div>
                <hr/>
                <div className="cart-header">
                  <div className="cart-headerdata">
                    {item.ProductName}- {item.BrandName}
                  </div>
                  <div className="cart-headerdata">
                  1
                  </div>
                  <div className="cart-headerdata">
                  {item.Price}
                  </div>
                  <div className="cart-headerdata">
                    <button className='btn btn-danger' onClick={() => this.removeFromCart(item)} >
                    Remove  
                    </button>
                  </div>
                </div>
                </div>
              )}
            </div>
            }
       </div>
       
      </div>
    );
  }
}

export default App;
