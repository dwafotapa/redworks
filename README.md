Redworks
============

Redworks is an image browser app built with [React](https://facebook.github.io/react/) that displays a list of artworks and drills down into them through filters.


## Installation

To build this project, clone this repository and run:

```sh
$ npm install
```

The command will install [npm 4.5](https://www.npmjs.com/) and these extra packages:

* [React-Select](http://jedwatson.github.io/react-select/)
* [React-Bootstrap](https://react-bootstrap.github.io/)
* [Bootstrap](http://getbootstrap.com/)


## Configuration

The .env file holds the API's url that points to:

```
REACT_APP_WORKS_API_URL=http://take-home-test.herokuapp.com/api/v1/works.json
```

Also, a config.js file, containing a list of camera makes and a list of camera models, has been added to prevent the app from searching through all the artworks to build the camera make and camera model filters. With tens of thousands of artworks, this could reveal to be pretty costly.


## Usage

To start the app, run:
```sh
$ npm start
```

A window will open and Redworks will be up and running at http://localhost:3000/.

To run the tests:
```sh
$ npm test
```