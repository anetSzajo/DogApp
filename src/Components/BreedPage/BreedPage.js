import React from "react";
import axios from "axios";
import SubBreed from "./SubBreed/SubBreed";
import BreedImagesContainer from "./BreedImagesContainer/BreedImagesContainer";
import '../../main.scss';

class BreedPage extends React.Component {
  state = {
    breed: this.props.location.state.breed,
    chosenSubBreedName: ''
  };

  getRandomWithinRangeExclusive(n) {
    return Math.floor(Math.random() * Math.floor(n));
  }

  reduceToN = (n) => (array) => {
    let newArray = [];
    for (let i = 0; i < n; i++) {
      newArray.push(array[this.getRandomWithinRangeExclusive(array.length)]);
    }
    return newArray;
  };

  reduceArrayTo3 = this.reduceToN(3);

  fetchBreedPhotos = () => {
    axios
      .get(`https://dog.ceo/api/breed/${this.state.breed.breedName}/images`)
      .then((res) => res.data.message)
      .then((imagesSrcArray) => this.reduceArrayTo3(imagesSrcArray))
      .then((reducedImagesSrc) => {
        this.setState({
          loaded: true,
          images: reducedImagesSrc
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  fetchSubBreedPhotos = (subBreedName) => {
    axios
      .get(`https://dog.ceo/api/breed/${this.state.breed.breedName}/${subBreedName}/images`)
      .then((res) => res.data.message)
      .then((imagesSrcArray) => this.reduceArrayTo3(imagesSrcArray))
      .then((reducedImagesSrc) => {
        this.setState({
          loaded: true,
          images: reducedImagesSrc,
          chosenSubBreedName: subBreedName
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.fetchBreedPhotos();
  }

  render() {
    const { breed } = this.state;

    if (this.state.loaded) {
      return (
        <div className="breedPage">
          <BreedImagesContainer images={this.state.images} breed={breed} subBreed={this.state.chosenSubBreedName}/>
          {(breed.subBreeds !== undefined && breed.subBreeds.length !== 0) ? (
            <div className="subBreeds__container">
              <div className="subBreeds__container--title">Subbreeds</div>
              <div className="subBreeds__container--elements">
              {breed.subBreeds.map((subBreedName, index) => (
                <SubBreed key={`${subBreedName}_${index}`} subBreedName={subBreedName} onClick={() =>this.fetchSubBreedPhotos(subBreedName)}/>
              ))}
              </div>
            </div>
          ) : null}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default BreedPage;
