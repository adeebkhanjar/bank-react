import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import Home from "./home";
import Transactions from "./transactions";
import Users from "./users";
import "./App.css";
import "./App.scss";
export default function App() {
  const [allUsers, setAllUsers] = useState(null);
  const getAllUsers = async () => {
    const response = await axios.get("https://bank-node.herokuapp.com/");
    setAllUsers(response.data.data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  const updateUserCredit = (id, credit) => {
    const updatedUser = allUsers.find((user) => {
      return user.passportId === id;
    });
    updatedUser.credit = credit;
    setAllUsers(
      allUsers.map((user) => {
        return user.passportId === id ? updatedUser : user;
      })
    );
  };
  const updateAdd = (a) => {
    setAllUsers([...allUsers, a]);
  };
  const addCash = (id, cash) => {
    const cuser = allUsers.find(
      (user) => parseInt(user.passportId) === parseInt(id)
    );
    cuser.cash = parseInt(cuser.cash) + parseInt(cash);
    setAllUsers(
      allUsers.map((user) =>
        parseInt(user.passportId) === parseInt(id) ? cuser : user
      )
    );
  };
  const takeCash = (id, cash) => {
    const cuser = allUsers.find(
      (user) => parseInt(user.passportId) === parseInt(id)
    );
    cuser.cash = parseInt(cuser.cash) - parseInt(cash);
    setAllUsers(
      allUsers.map((user) =>
        parseInt(user.passportId) === parseInt(id) ? cuser : user
      )
    );
  };
  const updateTransers = (amount, from, to) => {
    const userF = allUsers.find(
      (user) => parseInt(user.passportId) === parseInt(from)
    );
    userF.cash = parseInt(userF.cash) - parseInt(amount);
    const userT = allUsers.find(
      (user) => parseInt(user.passportId) === parseInt(to)
    );
    userT.cash = parseInt(userT.cash) + parseInt(amount);
    setAllUsers(
      allUsers.map((user) =>
        parseInt(user.id) === parseInt(from)
          ? userF
          : parseInt(user.id) === parseInt(to)
          ? userT
          : user
      )
    );
  };
  return (
    <Router>
      <div>
        <nav>
          <Link className="link" to="/">
            Home
          </Link>

          <Link className="link" to="/trans">
            Actions
          </Link>

          <Link className="link" to="/users">
            Users
          </Link>
        </nav>

        <Switch>
          <Route path="/trans">
            <Transactions
              allUsers={allUsers}
              updateAdd={updateAdd}
              updatedepo={addCash}
              updateWith={takeCash}
              updateTrans={updateTransers}
            />
          </Route>
          <Route path="/users">
            <Users
              allUsers={allUsers}
              sendUpdate={(a1, a2) => {
                updateUserCredit(a1, a2);
              }}
            />
          </Route>
          <Route path="/">
            <Home allUsers={allUsers} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
