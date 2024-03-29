import React, { useState } from "react";
import "./App.css";

import { fuses } from "./data/fuses";

const left = fuses.leftBank.reverse();
const right = fuses.rightBank.reverse();

type Fuse = {
  number: number;
  description: string;
  fuse: number;
} | null;

const getItems = (up: number, down: number): Fuse[] => {
  let array;

  if (up > 24) {
    array = left;
  } else {
    array = right;
  }

  return array.filter((item) => {
    if (item.number <= up && item.number >= down) {
      return item;
    }
    return null;
  });
};

const leftOne = getItems(58, 42);
const leftTwo = getItems(41, 25);
const rightOne = getItems(24, 17);
const rightTwo = getItems(16, 9);
const rightThree = getItems(8, 1);

function App() {
  const [number, setNumber] = useState(0);
  const [description, setDescription] = useState(
    "Select fuse to see description"
  );
  const [fuse, setFuse] = useState(0);

  const showFuse = (item: Fuse) => {
    item?.number && setNumber(item.number);
    item?.description && setDescription(item.description);
    item?.fuse ? setFuse(item.fuse) : setFuse(0);
  };

  const renderFuse = (item: Fuse) => {
    let classname = "item";

    if (item?.fuse === 0) {
      classname = "item disabled";
    }

    return (
      <div
        className={classname}
        title={item?.description}
        onClick={() => showFuse(item)}
      >
        <p className="number">{item?.number}</p>
        <p className="fuse">{item?.fuse}</p>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="fuses">
        <div className="left">
          <div className="row">
            {leftOne.map((item) => {
              return renderFuse(item);
            })}
          </div>
          <div className="row">
            {leftTwo.map((item) => {
              return renderFuse(item);
            })}
          </div>
        </div>

        <div className="right">
          <div className="row">
            {rightOne.map((item) => {
              return renderFuse(item);
            })}
          </div>
          <div className="row">
            {rightTwo.map((item) => {
              return renderFuse(item);
            })}
          </div>
          <div className="row">
            {rightThree.map((item) => {
              return renderFuse(item);
            })}
          </div>
        </div>
      </div>
      <hr />
      <br />
      <div>
        <span>
          <strong>№ {number}</strong> •{" "}
        </span>
        <span>
          {fuse ? <span className="amps">{fuse}A</span> : "Unused slot."}
        </span>
        <h2>{description}.</h2>
      </div>
    </div>
  );
}

export default App;
