import React from "react";
import BreedsListElement from "../BreedsList/BreedsListElement/BreedsListElement";
import './../../../main.scss';

function BreedsList({ breeds }) {
  return (
    <div className="breedsList">
      {breeds.map((breed, index) => (
        <BreedsListElement key={`${index}${breed}`} breed={breed} />
      ))}
    </div>
  );
}

export default BreedsList;
