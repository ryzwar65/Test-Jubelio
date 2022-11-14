import logo from "./logo.svg";
import "./App.css";
import { observer } from "mobx-react-lite";
import { useStore } from "./stores";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import Home from "./pages/Home";

const App = observer(() => {
  // const [first, setfirst] = useState([]);
  // const { produkstore } = useStore();
  // const [second, setsecond] = useState(0);

  // useEffect(() => {
  //   produkstore.loadData();
  //   console.log("GET DATA : ", produkstore.getProducts);
  //   setTimeout(() => {
  //     setfirst(first.concat(produkstore.getData()));
  //   }, 300);
  // }, [second]);

  // function counterIncrement() {
  //   produkstore.counterIncrementAction();
  //   setsecond(second + 8);
  // }
  return (
    <>
      <Home />
      {/* {produkstore.count} <br />
      <button onClick={counterIncrement}>INCREMENT</button> <br />
      <br />
      {first.length > 0
        ? first.map((val, index) => (
            <div key={index} className="mb-3">
              {" "}
              <div className="text-red-600">{index}</div> {JSON.stringify(val)}
            </div>
          ))
        : null} */}
    </>
  );
});

export default App;
