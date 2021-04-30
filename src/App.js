import { useState, useEffect, useRef } from "react";

const API_ENDPOINT = `http://localhost:5000`;
const GET_ROUTE = `pharmacy/category/get`;
const POST_ROUTE = `pharmacy/category/post`;

const App = () => {
  const [items, setItems] = useState([]);

  const _cname = useRef(null);
  const _author = useRef(null);

  useEffect(() => {
    console.log("use effect is running");
    fetch(`${API_ENDPOINT}/${GET_ROUTE}`)
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.warn(error));
  }, []);

  const submitData = () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        c_name: _cname.current.value,
        author: _author.current.value,
      }),
    };

    fetch(`${API_ENDPOINT}/${POST_ROUTE}`, options)
      .then(response => response.json())
      .then(data => {
        setItems(previousItems => [...previousItems, data]);
      })
      .catch(error => console.warn(error));
  };

  return (
    <div className="App" style={styles.container}>
      <div className="input" style={styles.input}>
        <label for="c_name">Medicine</label>
        <input ref={_cname} type="text" id="c_name"></input>
        <label for="author">Author</label>
        <input ref={_author} type="text" id="author"></input>
        <button onClick={submitData}>Submit</button>
      </div>
      <div className="output" style={styles.output}>
        <ul>
          {items.map((item, key) => (
            <li key={key}>
              <span>
                {item._id}, {item.c_name}, {item.author}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  image: {
    width: "300px",
  },
};

export default App;
