import { useState } from "react";
import AddUser from "./addUser";
import Deposit from "./deposit";
import Transfer from "./Transfer";
import Withdaw from "./Withdaw";

function Transactions({
  allUsers,
  updateAdd,
  updatedepo,
  updateWith,
  updateTrans,
}) {
  const [selected, setSelected] = useState("add user");
  const [actions] = useState(["add user", "deposit", "transfer", "withdraw"]);

  return (
    <div className="container">
      <select
        name="user-select"
        id="user-select"
        onChange={(e) => {
          setSelected(e.target.value);
        }}
      >
        {actions.map((action) => {
          return <option value={action}>{action}</option>;
        })}
      </select>
      {selected === "add user" ? (
        <AddUser allUsers={allUsers} updateAdd={updateAdd} />
      ) : (
        ""
      )}
      {selected === "deposit" ? (
        <Deposit allUsers={allUsers} updatedepo={updatedepo} />
      ) : (
        ""
      )}
      {selected === "transfer" ? (
        <Transfer allUsers={allUsers} updateTrans={updateTrans} />
      ) : (
        ""
      )}
      {selected === "withdraw" ? (
        <Withdaw allUsers={allUsers} updateWith={updateWith} />
      ) : (
        ""
      )}
    </div>
  );
}
export default Transactions;
<option value="dog">Dog</option>;
