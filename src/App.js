import React, { useEffect, useState } from "react";

const App = () => {
  const [tshirtData, setTshirtData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://tshirt-backend-mouli.onrender.com/tshirt"
        );
        const data = await response.json();
        setTshirtData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [logo, setLogo] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handlePostRequest = async (id) => {
    try {
      const response = await fetch(
        `https://tshirt-backend-mouli.onrender.com/tshirt/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ logo }),
        }
      );

      const data = await response.json();
      setResponseMessage(data.tshirt);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  return (
    <>
      <div>
        <h2>T-Shirt Details</h2>
        {tshirtData.map((tshirt, index) => (
          <div key={index}>
            <p>T-Shirt: {tshirt.tshirt}</p>
            <p>Size: {tshirt.size}</p>
            <p>Type: {tshirt.type}</p>
            <p>Team: {tshirt.team}</p>
            <p>Player: {tshirt.player}</p>
            <hr />
          </div>
        ))}
      </div>
      <div>
        <h2>Post a T-Shirt</h2>
        <label>
          Logo:
          <input
            type="text"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
          />
        </label>
        <button onClick={() => handlePostRequest(1)}>Post T-Shirt 1</button>
        <button onClick={() => handlePostRequest(2)}>Post T-Shirt 2</button>
        <button onClick={() => handlePostRequest(3)}>Post T-Shirt 3</button>

        {responseMessage && (
          <div>
            <h3>Server Response:</h3>
            <p>{responseMessage}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
