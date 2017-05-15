import React, { Component } from 'react';
import { Form, FormGroup, FormControl, InputGroup, Glyphicon, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Select from 'react-select';
import _ from 'lodash';
import classNames from 'classnames';

class SearchForm extends Component {
  static propTypes = {
    searchTerm: PropTypes.string.isRequired,
    cameraMakes: PropTypes.object.isRequired,
    cameraModels: PropTypes.object.isRequired,
    selectedCameraMakeId: PropTypes.string.isRequired,
    selectedCameraModelId: PropTypes.string.isRequired,
    works: PropTypes.array.isRequired,
    handleSearchTermChange: PropTypes.func.isRequired,
    handleCameraMakeChange: PropTypes.func.isRequired,
    handleCameraModelChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      moreFilters: false
    };
  }

  handleMoreFiltersClick = () => {
    this.setState(prevState => {
      return {
        moreFilters: !prevState.moreFilters
      };
    });
  }

  render() {
    // Initialises select options
    let cameraMakeOptions = [];
    _.each(this.props.cameraMakes, (cameraMake, key) => {
      cameraMakeOptions.push({
        value: cameraMake.id,
        label: cameraMake.name,
        aliases: cameraMake.aliases
      });
    });

    let cameraModelOptions = [];
    _.each(this.props.cameraModels, (cameraModel, key) => {
      cameraModelOptions.push({
        value: cameraModel.id,
        label: cameraModel.name
      });
    });
    
    // Shows/Hides more filters
    let moreFiltersClassNames = classNames({
      "more-filters": true,
      "hidden": !this.state.moreFilters
    });

    return (
      <Form inline className="SearchForm" onSubmit={this.props.handleSearchFormSubmit}>
        <FormGroup>
          <Select
            className="camera-make"
            placeholder="Select camera make..."
            options={cameraMakeOptions}
            value={this.props.selectedCameraMakeId}
            onChange={this.props.handleCameraMakeChange}
          />
        </FormGroup>
        <span> </span>
        <FormGroup className={_.isEmpty(this.props.selectedCameraMakeId) ? "hidden" : ""}>
          <Select
            className="camera-model"
            placeholder="Select camera model..."
            options={cameraModelOptions}
            value={this.props.selectedCameraModelId}
            disabled={_.isEmpty(this.props.cameraMakes)}
            onChange={this.props.handleCameraModelChange}
          />
        </FormGroup>
        <span> </span>
        <FormGroup className={moreFiltersClassNames}>
          <InputGroup>
            <InputGroup.Addon>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
            <FormControl
              type="text"
              className="search-term"
              value={this.props.searchTerm}
              placeholder="Search by id or filename"
              onChange={this.props.handleSearchTermChange}
            />
          </InputGroup>
        </FormGroup>
        <span> </span>
        <FormGroup className="pull-right">
          <Button bsStyle="link" onClick={this.handleMoreFiltersClick}>
            {!this.state.moreFilters ? "More" : "Less"} filters <Glyphicon glyph={!this.state.moreFilters ? "menu-down" : "menu-up"} />
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

export default SearchForm;