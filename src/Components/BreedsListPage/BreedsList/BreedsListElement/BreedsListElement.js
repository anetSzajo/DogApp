import React from "react";
import { Redirect } from "react-router-dom";
import { capitalizeFirstLetter } from '../../../../Common/utils';
import './../../../../main.scss';

class BreedsListElement extends React.Component {
  state = {
    redirect: false
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect push
          to={{
            pathname: "/breed",
            state: { breed: this.props.breed }
          }}
        />
      );
    }
  };

  render() {
    return (
      <div className="breedsList__element">
        {this.renderRedirect()}
        <button onClick={this.setRedirect}>
          {capitalizeFirstLetter(this.props.breed.breedName)}
        </button>
      </div>
    );
  }
}

export default BreedsListElement;
