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
  const [open, setopen] = useState(false)
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
  const handleCart = () => {
    // post api which will send to the course id and the user id from the frontend and then will getuser from the id and update the cart array with the course id
  }

  const handleFav = () =>{
    // api post will add the course to fav same
    // if added to fav we have in fav add to cart open if added to cart remove from the fav and add to cart 
  }

  const start = (page - 1) * limit;
  const paginatedData = fullData.slice(start, start + limit);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {paginatedData.map((card) => (
          <div key={card._id}
            className="card-box"
            onMouseEnter={() => setopen(true)}
            onMouseLeave={() => setopen(false)}
            style={{ position: 'relative' }}>
            <img src={`${base_url}${card.thumbnail}`} alt="thumbnail" width="100%" />
            <h4>{card.title}</h4>
            <p>{card.description}</p>
            <div >
              <span style={{ gap: '4x' }}>{card.userId.name}</span>,
              <span>{card.userId.profession}</span>
            </div>
            <h3>${card.price}</h3>
            {open &&
              <Paper
                elevation={4}
                onMouseLeave={() => setopen(false)}
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
                <button style={{ border: 'none', width: '60px', height: '50px' }}
                  onClick={handleCart}
                >
                  <IoCartOutline style={{ height: '20px', width: '30px' }} />
                </button>
                {isLogin && <button style={{ border: 'none', width: '60px', height: '50px', borderTop:"1px solid black" }}
                  onClick={handleFav}
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