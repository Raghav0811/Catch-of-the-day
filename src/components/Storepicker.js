import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  myInput = React.createRef();

  static propTypes = {
    history: PropTypes.object,
  };

  goToStore = (event) => {
    //1> stop form from submitting
    event.preventDefault();
    //2. get the text from that input
    const store = this.myInput.current.defaultValue;
    //3. Change the page to /store/whatever they enetered
    this.props.history.push(`/store/${store}`);
  };

  render() {
    return (
      <form action="" className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

export default StorePicker;
