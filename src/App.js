import React, { useState } from "react";
import AddTodo from "./AddTodo";
import "./index";

const App = () => {
  const [inputList, setInputList] = useState("");
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const listOfItem = (e) => {
    if (inputList === "") {
      e.preventDefault();
      return alert("Input Felid is empty");
    } else if (inputList && !isEditing) {
      e.preventDefault();
      setItems(
        items.map((elem, i) => {
          if (i == isEditItem) return { ...elem, name: inputList };
          return elem;
        })
      );
      setIsEditing(true);
      setInputList("");
      setIsEditItem(null);
      return;
    } else e.preventDefault();
    console.log("next");
    setItems((oldValue) => {
      const allInputData = {
        name: inputList,
      };
      return [...oldValue, allInputData];
    });
    setInputList("");
  };

  const del = () => {
    setItems(() => {
      return [];
    });
  };

  const deleteItem = (id) => {
    console.log(id);
    setItems((oldValue) => {
      return oldValue.filter((arrElement, i) => {
        return i != id;
      });
    });
  };
  const editTodo = (id) => {
    // console.log(id);
    let newEditItem = items.find((elem, i) => {
      // console.log(elem);
      if (i == id) {
        return setInputList(elem.name);
      }
    });
    // console.log(id);
    setIsEditing(false);
    setIsEditItem(id);
    // console.log(isEditItem);
  };

  return (
    <div className="main_div">
      <div className="center_div">
        <br />
        <h1>ToDo List</h1>
        <br />
        <form onSubmit={listOfItem}>
          <input
            type="text"
            placeholder="Enter text here"
            // itemEvent

            onChange={(e) => setInputList(e.target.value)}
            value={inputList}
          />
          {isEditing ? (
            <button type="submit">+</button>
          ) : (
            <button type="submit">Edit</button>
          )}
        </form>

        <ol>
          {items.map((itemVal, index) => {
            return (
              <AddTodo
                items={itemVal}
                onDel={deleteItem}
                key={index}
                id={index}
                editTodo={editTodo}
                editing={isEditing}
              />
            );
          })}
        </ol>
        <button onClick={del}>Del All</button>
      </div>
    </div>
  );
};

export default App;
