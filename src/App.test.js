import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const json =
{
  "works": {
    "work": [
      {
        "id": "31820",
        "filename": "162042.jpg",
        "urls": {
          "url": [
            {
              "type": "small",
              "link": "http://ih1.redbubble.net/work.31820.1.flat,135x135,075,f.jpg"
            }
          ]
        },
        "exif": {
          "make": "NIKON CORPORATION",
          "model": "NIKON D80"
        }
      },
      {
        "id": "2041",
        "filename": "2010.jpg",
        "urls": {
          "url": [
            {
              "type": "small",
              "link": "http://ih1.redbubble.net/work.2041.1.flat,135x135,075,f.jpg"
            }
          ]
        },
        "exif": {
          "model": "Canon EOS 20D",
          "make": "Canon",
        }
      }
    ]
  }
};

describe("App", () => {
  let props;

  beforeEach(() => {
    fetch = jest.fn(() => {
      return new Promise(resolve => resolve({
        json: () => json
      }))
    });
  });

  it('fetches data successfully', () => {
    fetch("http://take-home-test.herokuapp.com/api/v1/works.json").then(response => {
      return response.json();
    }).then(json => {
      expect(json.works.work).toHaveLength(2);
    }).catch(error => console.log(error));
  });

  it('always renders a SearchForm', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    const searchForm = div.getElementsByClassName("SearchForm");

    expect(searchForm).toHaveLength(1);
  });
});