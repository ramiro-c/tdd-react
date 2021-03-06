import React, { useState, Fragment } from 'react';
import axios from 'axios';
import Helmet from "react-helmet";

import Joke from '../Joke';
import { URL_TDD_COURSE_REPO, URL_GITHUB_REPO } from '../../utils/constants';

const JokeGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [joke, setJoke] = useState(false);

  const RANDOM_JOKE_URL = "https://api.icndb.com/jokes/random";

  const loadJoke = async () => {
    setLoading(true);

    const { data: { value: { joke } } } = await axios.get(RANDOM_JOKE_URL);

    setLoading(false);
    setJoke(joke);
  }

  const h1Style = {
    lineHeight: "39px"
  }

  return (
    <Fragment>
      <Helmet>
        <title>TDD - JokeGenerator</title>
      </Helmet>
      <div className="hero is-fullheight pb-6">
        <div className="hero-body">
          <div className="content has-text-centered mx-auto">
            <h1 className="mb-0" style={h1Style}>
              Welcome to <strong>JokeGenerator</strong>
            </h1>
            <p className="mb-5 is-size-6" >
              from <a href={URL_TDD_COURSE_REPO} className="is-underlined">TDD - Course</a>
            </p>

            {!joke && !loading && <p>You haven't loaded any joke yet!</p>}
            {loading && <p>Loading...</p>}
            {joke && !loading && <Joke text={joke} />}

            <button
              onClick={() => loadJoke()}
              type="button"
              className="button is-primary mt-3 mb-1">
              Load a random joke
            </button>
            <br />
            <a href={URL_GITHUB_REPO} className="is-underlined is-size-7">
              Project GitHub repository
            </a>
          </div>
        </div>
      </div>
    </Fragment >
  )
}

export default JokeGenerator;
