import React from 'react';
import PropTypes from 'prop-types';

const Joke = ({ text }) => {
  const styles = {
    maxWidth: "500px"
  }
  return (
    <blockquote style={styles} dangerouslySetInnerHTML={{ __html: text }}></blockquote>
  )
}

Joke.propTypes = {
  text: PropTypes.string.isRequired
}

export default Joke;