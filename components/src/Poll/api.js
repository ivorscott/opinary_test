export const mockResultStore = {
  "feel-today": {
    question: "How do you feel today?",
    choices: {
      A: "Brilliant! I have so much energy.",
      B: "I've had worse days.",
      C: "Please, end my misery.",
    },
    results: {
      A: 1,
      B: 2,
      C: 3,
    },
  },
  "tax-spending": {
    question: "Where would you like your tax dollars spent?",
    choices: {
      A: "Education",
      B: "Social Care",
      C: "Health Care",
      D: "Military",
    },
    results: {
      A: 10500,
      B: 3000,
      C: 700,
      D: 400,
    },
  },
};

const delayedResult = (result) =>
  new Promise((res) => setTimeout(() => res(result), 1000));

export const getPoll = (pollId) => delayedResult(mockResultStore[pollId]);

export const getResults = (pollId) =>
  JSON.parse(localStorage.getItem(`poll:${pollId}-results`)) || {};

export const getSelection = (pollId) =>
  localStorage.getItem(`poll:${pollId}-selection`) || "";

export const saveResults = (pollId, results) =>
  localStorage.setItem(`poll:${pollId}-results`, JSON.stringify(results));

export const saveSelection = (pollId, selection) =>
  localStorage.setItem(`poll:${pollId}-selection`, selection);
