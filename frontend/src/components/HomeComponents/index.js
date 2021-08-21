import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/chat/${user}`);
  };

  return (
    <div className='container my-3'>
      <form onSubmit={handleSubmit}>
        <div className='form-floating'>
          <input
            type='text'
            className='form-control'
            id='floatingInput'
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <label htmlFor='floatingInput'>Username</label>
        </div>
      </form>
    </div>
  );
};

export default Home;
