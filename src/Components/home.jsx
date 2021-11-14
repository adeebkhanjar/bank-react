function Home({ allUsers }) {
  return (
    <div className="l-container">
      {allUsers
        ? allUsers.map((user) => {
            return (
              <div key={user.id} className="b-game-card">
                <div className="b-game-card__cover">
                  <p>name: {user.name}</p>
                  <p>passportId: {user.passportId}</p>
                  <p>cash: {user.cash}</p>
                  <p>credit: {user.credit}</p>
                </div>
              </div>
            );
          })
        : "loading..."}
    </div>
  );
}
export default Home;
// { "type": "deposit", "amount": 100, "from": null, "to": null }<div>
//     <p>transactions:</p>
//     {user.transactions.length > 0 ? "1" : "none"}
//   </div>
{
  /* <div className="col">
                    <input type="button" value="deposit" />
                    <input type="button" value="withdraw" />
                    <input type="button" value="transfer" />
                  </div> */
}
