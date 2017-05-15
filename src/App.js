import React, { Component } from 'react';
import _ from 'lodash';
import 'whatwg-fetch';
import config from './config.js';
import SearchForm from './SearchForm.js';
import Work from './Work.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCameraMakeId: '', // camera make filter
      selectedCameraModelId: '', // camera model filter
      searchTerm: '', // id and filename filter
      entities: {
        cameraMakes: config.cameraMakes, // camera makes dropdown
        cameraModels: {}, // camera models dropdown
        works: [] // works to display
      }
    };
    this.fetchWorks();
  }

  fetchWorks() {
    fetch(process.env.REACT_APP_WORKS_API_URL).then(function(response) {
      return response.json();
    }).then((json) => {
      this.setState(prevState => {
        return {
          entities: {
            ...prevState.entities,
            works: json.works.work
          }
        };
      });
    }).catch(function(ex) {
      console.log('parsing failed', ex);
    });
  }

  handleSearchTermChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    });
  }

  handleCameraMakeChange = (option) => {
    // Updates the selected camera make, resets the selected camera model and updates the list of camera models
    this.setState(prevState => {
      return {
        selectedCameraMakeId: _.isEmpty(option) ? '' : option.value,
        selectedCameraModelId: '',
        entities: {
          ...prevState.entities,
          cameraModels: _.isEmpty(option)
            ? {}
            : _.pickBy(config.cameraModels, (cameraModel, key) => cameraModel.cameraMakeId === option.value)
        }
      };
    });
  }

  handleCameraModelChange = (option) => {
    // Updates the selected camera model
    this.setState({
      selectedCameraModelId: _.isEmpty(option) ? '' : option.value
    });
  }

  filterBySearchTerm = (work, index) => {
    if (_.includes(work.id, this.state.searchTerm) || _.includes(work.filename, this.state.searchTerm)) {
      return work;
    }

    return null;
  }

  filterByCameraMake = (work, index) => {
    const hasCameraMake = work.exif.make === this.state.entities.cameraMakes[this.state.selectedCameraMakeId].name;
    const hasCameraMakeAlias = _.includes(this.state.entities.cameraMakes[this.state.selectedCameraMakeId].aliases, work.exif.make);
    if (hasCameraMake || hasCameraMakeAlias) {
      return work;
    }
    
    return null;
  }

  filterByCameraModel = (work, index) => {
    if (work.exif.model === this.state.entities.cameraModels[this.state.selectedCameraModelId].name) {
      return work;
    }
    
    return null;
  }

  render() {
    // Filters the works (or not) according to active filters
    let filteredWorks = this.state.entities.works;
    if (!_.isEmpty(this.state.selectedCameraMakeId)) filteredWorks = filteredWorks.filter(this.filterByCameraMake);
    if (!_.isEmpty(this.state.selectedCameraModelId)) filteredWorks = filteredWorks.filter(this.filterByCameraModel);
    if (!_.isEmpty(this.state.searchTerm)) filteredWorks = filteredWorks.filter(this.filterBySearchTerm);
    
    let isAppStart = _.isEmpty(this.state.selectedCameraMakeId) && _.isEmpty(this.state.selectedCameraModelId) && _.isEmpty(this.state.searchTerm);
    let rows = _.isEmpty(filteredWorks) && !isAppStart
      ? <p className="Work-no-results">No results found.</p>
      : filteredWorks.map((work, index) => {
          return <Work key={work.id} item={work} />;
        });

    return (
      <div className="App">
        <div className="App-header">
          <div className="logo">Redworks</div>
          <SearchForm 
            searchTerm={this.state.searchTerm}
            cameraMakes={this.state.entities.cameraMakes}
            cameraModels={this.state.entities.cameraModels}
            selectedCameraMakeId={this.state.selectedCameraMakeId}
            selectedCameraModelId={this.state.selectedCameraModelId}
            works={this.state.entities.works}
            handleSearchTermChange={this.handleSearchTermChange}
            handleCameraMakeChange={this.handleCameraMakeChange}
            handleCameraModelChange={this.handleCameraModelChange}
          />
        </div>
        <div className="App-main">
          {rows}
        </div>
      </div>
    );
  }
}

export default App;