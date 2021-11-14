import axios from "axios";
import React, { useState } from "react";

export default function Withdaw({ allUsers, updateWith }) {
  const [id, setId] = useState(null);
  const [amount, setAmount] = useState(null);
  const [funds, setFunds] = useState(null);

  const takeCash = async () => {
    setFunds("");
    const takeUser = allUsers.find(
      (user) => parseInt(user.passportId) === parseInt(id)
    );
    if (!takeUser) return;
    const pile = takeUser.cash + takeUser.credit;
    console.log(takeUser.cash);
    if (amount > pile) {
      setFunds("insufficient funds");
      console.log(funds);
      return;
    }
    const response = await axios.put(
      "https://bank-node.herokuapp.com/takecash",
      {
        id: id,
        cash: amount,
      }
    );
    if (response.status === 201) {
      updateWith(response.data.id, response.data.cash);
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
        value="withdraw"
        onClick={() => {
          takeCash();

          setId("");
          setAmount("");
        }}
      />
      <p>{funds}</p>
    </div>
  );
}
