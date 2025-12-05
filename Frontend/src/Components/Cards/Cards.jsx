import React, { useEffect, useState, useContext } from "react";
import { loginContext } from "../../App";
import api from "../../utils/api";

function Cards({ title }) {
  const { isLogin } = useContext(loginContext);

  const [fullData, setFullData] = useState([]);
  const [page, setPage] = useState(1);

  const limit = isLogin ? 5 : 4;

  useEffect(() => {
    const fetchData = async () => {
      const formatted = title.toLowerCase().replace(/ /g, "-");
      const res = await api.getCards(formatted);

      setFullData(res.data.data);
      setPage(1);
    };

    fetchData();
  }, [title]);

  const start = (page - 1) * limit;
  const paginatedData = fullData.slice(start, start + limit);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {paginatedData.map((card) => (
          <div key={card._id} className="card-box">
            <img src={card.thumbnail} width="100%" />
            <h4>{card.title}</h4>
            <p>{card.author}</p>
            <h3>₹{card.price}</h3>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 10 }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>

        <button
          disabled={page >= Math.ceil(fullData.length / limit)}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Cards;