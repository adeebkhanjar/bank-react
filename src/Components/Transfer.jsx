import axios from "axios";
import React, { useState } from "react";

export default function Transfer({ allUsers, updateTrans }) {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [amount, setAmount] = useState();
  const transferCash = async () => {
    const userFrom = allUsers.find(
      (user) => parseInt(user.passportId) === parseInt(from)
    );
    const userTo = allUsers.find(
      (user) => parseInt(user.passportId) === parseInt(to)
    );
    const pile = userFrom.cash + userFrom.credit;
    if (pile < amount) return; //no no baby!!
    const response = await axios.put(
      "https://bank-node.herokuapp.com/takecash",
      {
        id: from,
        cash: amount,
      }
    );
    const response2 = await axios.put(
      "https://bank-node.herokuapp.com/addcash",
      {
        id: to,
        cash: amount,
      }
    );
    if (response.status === 201 && response2.status === 201) {
      updateTrans(amount, response.data.id, response2.data.id);
    }
  };

  return (
    <div className="col">
      <input
        type="text"
        placeholder="passportId...     from"
        value={from}
        onChange={(e) => {
          setFrom(e.target.value);
        }}
      />{" "}
      <input
        type="text"
        placeholder="passportId...     to"
        value={to}
        onChange={(e) => {
          setTo(e.target.value);
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
        value="transfer"
        onClick={() => {
          transferCash();
        }}
      />{" "}
    </div>
  );
}
