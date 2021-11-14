import axios from "axios";
import React, { useState } from "react";

export default function Deposit({ allUsers, updatedepo }) {
  const [id, setId] = useState(null);
  const [amount, setAmount] = useState(null);
  const addCash = async () => {
    const user = allUsers.find(
      (user) => parseInt(user.passportId) === parseInt(id)
    );
    if (!user) return;
    const response = await axios.put(
      "https://bank-node.herokuapp.com/addcash",
      {
        id: id,
        cash: amount,
      }
    );
    if (response.status === 201) {
      updatedepo(response.data.id, response.data.cash);
      setId("");
      setAmount("");
    }
  };

  return (
    <div className="col">
      <input
        type="text"
        placeholder="passportId..."
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
      />{" "}
      <input
        type="text"
        placeholder="amount..."
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />{" "}
      <input
        style={{ width: "100%" }}
        type="button"
        value="deposit"
        onClick={() => {
          addCash();
        }}
      />{" "}
    </div>
  );
}
