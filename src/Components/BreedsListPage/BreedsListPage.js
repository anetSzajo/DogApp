import React from "react";
import axios from "axios";
import BreedsList from "./BreedsList/BreedsList";
import FilterByBreed from '../FilterByBreed/FilterByBreed';
import '../../main.scss';

class BreedsListPage extends React.Component {
    state = {
        loaded: false,
        breeds: [],
        filterInputQuery: ''
    };

    transformApiResponse = (data) =>
        Object.entries(data.message).map((n) => {
            return {breedName: n[0], subBreeds: n[1]};
        });

    fetchBreeds = () => {
        axios
            .get("https://dog.ceo/api/breeds/list/all")
            .then((res) => {
                this.setState({
                    loaded: true,
                    breeds: this.transformApiResponse(res.data)
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    componentDidMount() {
        this.fetchBreeds();
    }

    handleBreedChange = (filterInputQuery) => {
        this.setState({
            filterInputQuery
        })
    }

    filteringResults = () => {
        return this.state.breeds.filter(breed =>
            breed.breedName.toLowerCase().includes(this.state.filterInputQuery.toLowerCase()));
    }

    render() {
        if (this.state.loaded) {
            return (
                <div className="breedsListPage">
                    <h2>Check out awesome dogs!</h2>
                    <FilterByBreed
                        handleBreedChange={this.handleBreedChange}
                    />
                    <div className="breedsList__container">
                        <BreedsList
                            breeds={this.state.filterInputQuery === '' ? this.state.breeds : this.filteringResults()}
                        />
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default BreedsListPage;
