import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import samplefishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object,
  };

  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    console.log(this.state.order);
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  addFish = (fish) => {
    const fishes = { ...this.state.fishes };

    fishes[`fish${Date.now()}`] = fish;

    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    //1. Take a copy of current state
    const fishes = { ...this.state.fishes };
    //2. update that state
    fishes[key] = updatedFish;
    //3. set that to state
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    //take a copy of the current state
    const fishes = { ...this.state.fishes };
    //update the state
    fishes[key] = null;
    //update the state
    this.setState({ fishes });
  };

  loadSamplefishes = () => {
    this.setState({ fishes: samplefishes });
  };

  addToOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  removeFromOrder = (key) => {
    //1. copy of state
    const order = { ...this.state.order };
    //2. remove fish item from order
    delete order[key];
    //3. use setState to update state
    this.setState({ order });
  };
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="FRESH SEAFOOD MARKET" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => {
              return (
                <Fish
                  key={key}
                  index={key}
                  details={this.state.fishes[key]}
                  addToOrder={this.addToOrder}
                ></Fish>
              );
            })}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSamplefishes={this.loadSamplefishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
