const Course = ({ course }) => {
  const Header = ({ courseName }) => <h1>{courseName}</h1>;

  const Part = ({ name, exercises }) => (
    <p>
      {name} {exercises}
    </p>
  );

  const Content = ({ parts }) => (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10, id: 1 },
      { name: 'Using props to pass data', exercises: 7, id: 2 },
      { name: 'State of a component', exercises: 14, id: 3 },
    ],
  };

  return <Course course={course} />;
};

export default App;
