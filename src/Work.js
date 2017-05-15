import React from 'react';
import PropTypes from 'prop-types';

Work.PropTypes = {
  item: PropTypes.array.isRequired
}

function Work (props) {
  return (
    <div className="Work">
      <img className="Work-image" src={props.item.urls.url[0].link} alt={props.item.filename} />
    </div>
  );
}

export default Work;