import React, { useEffect, useState, useContext } from "react";
import { loginContext } from "../../App";
import api from "../../utils/api";
const base_url = import.meta.env.VITE_BASE_URL;
import { IoCartOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { Box, Paper } from "@mui/material";

function Cards({ title }) {
  const { isLogin } = useContext(loginContext);

  const [fullData, setFullData] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [page, setPage] = useState(1);

  const limit = isLogin ? 5 : 4;

  useEffect(() => {
    const fetchData = async () => {
      let res;
      if (!title) {
        res = await api.getAllCards();
      } else {
        const formatted = title.toLowerCase().replace(/ /g, "-");
        res = await api.getCards(formatted);
      }

      setFullData(res.data.data);
      setPage(1);
    };

    fetchData();
  }, [title]);

  console.log(fullData)
  const handleCart = async (cardId) => {
    try {
      const user = JSON.parse(localStorage.getItem('login-info'))
      const userId = user._id;
      const data = { cardId, userId }
      const res = await api.postCart(data);
      console.log(res.data)
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleFav = async (cardId) => {
    try {
      const user = JSON.parse(localStorage.getItem('login-info'))
      const userId = user._id;
      const data = { cardId, userId }
      console.log(data)
      await api.postFav(data)
    }
    catch (err) {
      console.log(err.message);
    }
  }

  const start = (page - 1) * limit;
  const paginatedData = fullData.slice(start, start + limit);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${limit}, 1fr)`, gridAutoRows: "auto", gap: "20px" ,margin:'5px'}}>
        {fullData.length > 0 && paginatedData.map((card) => (
          <div key={card._id}
            className="card-box"
            onMouseEnter={() => setHoveredCard(card._id)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{ position: 'relative' }}>
            <img src={`${base_url}${card.thumbnail}`} alt="thumbnail" width="100%" />
            <h4>{card.title}</h4>
            <p>{card.description}</p>
            <div >
              <span style={{ gap: '4x' }}>{card.userId.name}</span>,
              <span>{card.userId.profession}</span>
            </div>
            <h3>${card.price}</h3>
            {hoveredCard === card._id &&
              <Paper
                elevation={4}
                onMouseLeave={() => setHoveredCard(null)}
                sx={{
                  position: "absolute",
                  top: '50%',
                  left: '95%',
                  display: "flex",
                  flexDirection: 'column',
                  bgcolor: "white",
                  borderRadius: "10px",
                  boxShadow: 4,
                  zIndex: 999,
                  overflow: "hidden",
                }}>
                <button style={{ border: 'none', width: '60px', height: '50px', cursor: 'pointer' }}
                  onClick={() => handleCart(card._id)}
                >
                  <IoCartOutline style={{ height: '20px', width: '30px' }} />
                </button>
                {isLogin && <button style={{ border: 'none', width: '60px', height: '50px', borderTop: "1px solid black", cursor: 'pointer' }}
                  onClick={() => handleFav(card._id)}
                >
                  <MdFavoriteBorder style={{ height: '20px', width: '30px' }} />
                </button>}
              </Paper>
            }
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