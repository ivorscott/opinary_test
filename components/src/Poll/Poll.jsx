// Configure questions in the backend and then fetch the poll data from the backend using a pollId.

// example data structure

// {
//  "feel-today": {
//    question: "How do you feel today?",
//    choices: {
//      A: "Brilliant! I have so much energy.",
//      B: "I've had worse days.",
//      C: "Please, end my misery.",
//    },
//    results: {
//      A: 1,
//      B: 2,
//      C: 3,
//    }
//   }
// }

import React, { useState, useEffect } from "react";
import { drawChart, mapChartData } from "./Chart";
import {
  getPoll,
  getResults,
  getSelection,
  saveResults,
  saveSelection,
} from "./api";
import "./styles.css";

export const Branding = () => <span className="brand">Powered by Opinary</span>;

export const Loader = () => (
  <div className="lds-dual-ring">
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export const PollResults = ({ question, choices, results }) => {
  useEffect(() => {
    const resultsArray = mapChartData(results, choices);
    drawChart(resultsArray);
  }, [results, choices]);
  return (
    <div className="poll__results">
      <h1 role="heading" className="poll__results-title">
        Results
      </h1>
      <p role="description" className="poll__results-question">
        {question}
      </p>
      <div role="chart" id="chart" />
    </div>
  );
};

export const PollOptions = ({ choices, onClick }) =>
  Object.keys(choices).map((option) => (
    <li
      key={`opt-${option}`}
      role="option"
      onClick={() => onClick(option)}
      className="poll__options-item"
    >
      {choices[option]}
    </li>
  ));

export const Poll = ({ pollId }) => {
  const previousSelection = getSelection(pollId);
  const storedResults = getResults(pollId);

  const [isLoading, setLoading] = useState(true);
  const [selection, setSelection] = useState(previousSelection);
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState({});
  const [results, setResults] = useState({});

  const updateResults = (selection) => {
    results[selection] = results[selection] + 1;
    saveSelection(pollId, selection);
    saveResults(pollId, results);
    setSelection(selection);
  };

  useEffect(() => {
    const fetch = async () => {
      const poll = await getPoll(pollId);
      setQuestion(poll.question);
      setChoices(poll.choices);
      setResults(poll.results);
      setLoading(false);
    };
    fetch();
  }, [pollId]);

  if (isLoading) {
    return (
      <div className="poll">
        <Loader />
      </div>
    );
  }

  return (
    <div className="poll">
      {!selection ? (
        <div>
          <h1 role="heading" className="poll__question">
            {question}
          </h1>
          <ul className="poll__options">
            <PollOptions onClick={updateResults} choices={choices} />
          </ul>
        </div>
      ) : (
        <PollResults
          question={question}
          choices={choices}
          results={storedResults}
        />
      )}
      <Branding />
    </div>
  );
};
