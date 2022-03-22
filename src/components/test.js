import React, { useState } from "react";

const Test = ({ animalForm, setAnimalForm, title, idName }) => {
  const handleChange = (e) => {
    const _test = { ...animalForm, [e.target.name]: e.target.value };
    setAnimalForm(_test);
  };
  return (
    <div className="adoption-form-content">
      <label htmlFor="title" className="adoption-form-title">
        {title}
      </label>
      <input
        className="animal-form-box"
        autoComplete="off"
        type="text"
        id={idName}
        name={idName}
        value={animalForm["title"]}
        onChange={handleChange}
      />
    </div>
  );
};

function Test1(props) {
  const [animalForm, setAnimalForm] = useState({
    title: "",
    name: "",
  });

  return <Test animalForm={animalForm} setAnimalForm={setAnimalForm} idName={props.idName} title={props.title} />;
}

export default Test1;

// import React, { useState } from "react";

// const Test = ({ test, setTest }) => {
//   const handleChange = (e) => {
//     const _test = { ...test, [e.target.name]: e.target.value };
//     setTest(_test);
//   };

//   return (
//     <div style={{ margin: "200px" }}>
//       <input name="value2" value={test["value2"]} onChange={handleChange}></input>
//     </div>
//   );
// };

// function Test1(props) {
//   const [test, setTest] = useState({ value1: "", value2: "" });

//   return <Test test={test} setTest={setTest} />;
// }

// export default Test1;
