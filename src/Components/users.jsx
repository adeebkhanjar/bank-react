import axios from "axios";
import { useEffect, useState } from "react";

function Users({ allUsers, sendUpdate }) {
  const [userById, setUserById] = useState(null);
  const [user, setuser] = useState(null);
  const [update, setUpdate] = useState(false);
  const [credit, setCredit] = useState(0);
  const [updatedCredit, setUpdatedCredit] = useState(0);
  const [val, setVal] = useState(false);
  const findUser = () => {
    if (!userById) return;
    let user = allUsers.find((user) => {
      return user.passportId === parseInt(userById);
    });
    if (!user) return;
    setuser(user);
    setCredit(user.credit);
    setUpdatedCredit(user.credit);
  };
  useEffect(() => {
    findUser();
    // eslint-disable-next-line
  }, [userById]);
  const updateCredit = async () => {
    const response = await axios.put("https://bank-node.herokuapp.com/credit", {
      credit: credit,
      id: user.passportId,
    });
    console.log(response);
  };
  return (
    <div className="container">
      <input
        type="text"
        placeholder="passportId..."
        onChange={(e) => {
          setuser(null);
          setUserById(parseInt(e.target.value));
        }}
      />

      {user ? (
        <div className="card">
          <p>name: {user.name}</p>
          <p>passportId: {user.passportId}</p>
          <p>cash: {user.cash}</p>
          {update ? (
            <>
              <input
                type="text"
                placeholder={credit}
                onChange={(e) => {
                  setCredit(e.target.value);
                }}
              />
              {val ? <p>numbers only!!</p> : ""}
              <div className="space-between">
                <input
                  type="button"
                  value="update"
                  onClick={() => {
                    if (parseInt(credit).toString().length === credit.length) {
                      setVal(false);
                      setUpdate(false);
                      updateCredit();
                      setUpdatedCredit(credit);
                      sendUpdate(user.passportId, credit);
                    } else {
                      setVal(true);
                    }
                  }}
                />
                <input
                  type="button"
                  value="cancel"
                  onClick={() => {
                    setUpdate(false);
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <p>credit: {updatedCredit}</p>
              <input
                style={{ width: "100%" }}
                type="button"
                value="update credit"
                onClick={() => {
                  setUpdate(true);
                }}
              />
            </>
          )}
          <p>transactions:</p>
          {user.transactions.length > 0
            ? user.transactions.map((trans, i) => {
                return (
                  <div className="card c1" key={i}>
                    <p>type: {trans.type}</p>
                    <p>amount: {trans.amount}</p>
                    {trans.from ? <p>from: {trans.from}</p> : ""}
                    {trans.to ? <p>to: {trans.to}</p> : ""}
                  </div>
                );
              })
            : "none"}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default Users;
