import React, { useEffect, useState, useContext } from "react";
import { loginContext } from "../../App";
import api from "../../utils/api";
const base_url = import.meta.env.VITE_BASE_URL;
import { IoCartOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { Box, Paper } from "@mui/material";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import './Cards.css'

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
    const user = JSON.parse(localStorage.getItem('login-info'))
     if (!user) {
        let guestCart = JSON.parse(localStorage.getItem("guest-cart")) || [];

        if (!guestCart.includes(cardId)) guestCart.push(cardId);

        localStorage.setItem("guest-cart", JSON.stringify(guestCart));
        toast.success("Added to cart");
        return;
    }
    try {
      const userId = user._id;
      const data = { cardId, userId }
      const res = await api.postCart(data);
      // console.log(res.data)
      toast.success('Successfully Added')
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
      toast.success('Successfully Added')
    }
    catch (err) {
      console.log(err.message);
    }
  }
  const user = JSON.parse(localStorage.getItem('login-info'));

  const handleCardDelete = async (cardId) => {
    await api.deleteCardItem(cardId);
    toast.error('Course deleted')
    let res;
    if (!title) {
      res = await api.getAllCards();
    } else {
      const formatted = title.toLowerCase().replace(/ /g, "-");
      res = await api.getCards(formatted);
    }
    console.log(res.data.data);
    setFullData(res.data.data);
    setPage(1);
  }

  const start = (page - 1) * limit;
  const paginatedData = fullData.slice(start, start + limit);

  return (
    <div className="parent-container">
      {page > 1 && <button onClick={() => setPage(page - 1)} className="previous">
        &lt;
      </button>}
      <div style={{ gridTemplateColumns: `repeat(${limit}, 1fr)` }} className="cards-grid">

        {fullData.length > 0 && paginatedData.map((card) => (
          <div key={card._id}
            className="card-box"
            onMouseEnter={() => setHoveredCard(card._id)}
            onMouseLeave={() => setHoveredCard(null)}>
            <img src={`${base_url}${card.thumbnail}`} alt="thumbnail" width="100%" />
            <h4>{card.title}</h4>
            <em>{card.description}</em>
            <div className="data">
              <span style={{ gap: '4px' }}>{card.userId.name}</span>, <span>{card.userId.profession}</span>
            </div>
            <h3>${card.price}</h3>
            {hoveredCard === card._id &&
              <Paper
                elevation={4}
                onMouseLeave={() => setHoveredCard(null)}
                className="paper-wrapper"
              >
                <button className="cart-btn"
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
            {isLogin && user.role != 'learner' && (user.role === 'admin' || user._id === card.userId._id) &&
              <div className="delete-btn">
                <button onClick={() => handleCardDelete(card._id)} >Delete Course</button>
              </div>
            }
          </div>
        ))}
      </div>
      {page < Math.ceil(fullData.length / limit) && <button
        onClick={() => setPage(page + 1)}
        className="next"
      >
        &gt;
      </button>}
    </div>
  );
}

export default Cards;