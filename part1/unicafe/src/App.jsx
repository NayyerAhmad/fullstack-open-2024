import { useState } from 'react';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <p>{text}: {value}</p>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  if (total === 0) {
    return <p>No feedback given</p>;
  }
  const average = (good - bad) / total;
  const positivePercentage = (good / total) * 100;

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <tr><td>Good</td><td>{good}</td></tr>
          <tr><td>Neutral</td><td>{neutral}</td></tr>
          <tr><td>Bad</td><td>{bad}</td></tr>
          <tr><td>Total</td><td>{total}</td></tr>
          <tr><td>Average</td><td>{average}</td></tr>
          <tr><td>Positive</td><td>{positivePercentage}%</td></tr>
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Unicafe Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;