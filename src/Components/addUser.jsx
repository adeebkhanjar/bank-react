import axios from "axios";
import { useState } from "react";

function AddUser({ allUsers, updateAdd }) {
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [mess, setMess] = useState(null);
  console.log(id);
  const addUser = async () => {
    let user = allUsers.find((user) => {
      console.log(user.passportId);
      return parseInt(user.passportId) === parseInt(id);
    });
    console.log(user);
    if (user) {
      setMess("user exists");
      return;
    }
    const response = await axios.post("https://bank-node.herokuapp.com/", {
      passportId: id,
      name: name,
    });
    if (response.status === 201) {
      updateAdd(response.data.user);
    }
  };

  return (
    <div className="col">
      <input
        type="text"
        placeholder="passportId..."
        onChange={(e) => {
          setId(e.target.value);
        }}
      />{" "}
      <input
        type="text"
        placeholder="name..."
        onChange={(e) => {
          setName(e.target.value);
        }}
      />{" "}
      <input
        style={{ width: "100%" }}
        type="button"
        value="add"
        onClick={() => {
          setMess("");
          addUser();
        }}
      />{" "}
      <p>{mess}</p>
    </div>
  );
}
export default AddUser;
