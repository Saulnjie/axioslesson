import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { capitalize, orderBy } from "lodash";
import moment from "moment";
import { format, compareAsc } from "date-fns";
import { DateTime } from "luxon";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

function App() {
  const [list, setList] = useState([]);
  const [order, setOrder] = useState(false);
  const handleOnClick = () => {
    const newOrder = order ? "asc" : "desc";
    setList(orderBy(list, ["title"], ["desc"], [newOrder]));
    setOrder(!order);
  };

  // useEffect(() => {
  //   const fetchdata = async () => {
  //     let response = await fetch("https://jsonplaceholder.typicode.com/posts");
  //     let json = await response.json();
  //     console.log(json);
  //   };
  //   fetchdata();
  // }, []);

  useEffect(() => {
    const fetchAxios = async () => {
      const { data } = await axiosInstance.get("/posts");

      setList(orderBy(data, ["title"]));

      // const formatData = data.map((item) => {
      //   return {
      //     ...item,
      //     title: capitalize(item.title),
      //   };
      // });
      // // console.log(formatData);

      // const orderedData = orderBy(formatData, ["title"]);
      // console.log(orderedData);
    };
    fetchAxios();
  }, []);

  console.log(DateTime.now().toLocaleString());

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>{DateTime.now().toLocaleString()}</div>
        <div>{moment("1994-10-4").add(3, "days").format()}</div>
        <div>{format(new Date(1994, 10, 4), "yyyy-MM-dd")}</div>
        <button
          onClick={() => {
            handleOnClick();
          }}
        >
          Sort by title
        </button>
        {list.map((item) => {
          return <p key={item.id}>{item.title}</p>;
        })}
      </header>
    </div>
  );
}

export default App;
