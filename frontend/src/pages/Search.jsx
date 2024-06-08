import { createURL } from "../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
 
const Search = () => {
  const navigate = useNavigate();
  const [searchitem, setSearch] =useState("");
  const [items, setItems] = useState("");
  function convertTimestampToReadable(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
 
    const formattedTime = `${hours % 12 || 12}:${minutes
      .toString()
      .padStart(2, "0")} ${hours >= 12 ? "pm" : "am"}`;
 
    const formattedDate = `${day.toString().padStart(2, "0")}-${month
      .toString()
      .padStart(2, "0")}-${year}`;
 
    return `${formattedTime} ${formattedDate}`;
  }
  const loadBlogs = () => {
    const url = createURL(`bytitle?FilterQuery=${searchitem}`);
 
    const token = sessionStorage["token"];
    if (!token) {
      navigate("/");
      return;
    }
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const result = response;
        if (result.status === 200) {
          const data = result.data;
          setItems(data);
        } else {
          alert("error while loading your blogs");
          navigate("/");
        }
       
      })  
         .catch((error) => {
        console.log(`error: `, error);
      });
  };
 
  useEffect(() => {
    loadBlogs();
  }, [items]);
  return (
    <div>
       <div id="search" style={{display:"flex", justifyContent:"center"}} >
      <h2
        style={{ position: "relative", alignItems: "center",fontFamily: 'Times New Roman' }}
        className="title"
      >
        {/* Search{" "} */}
      </h2>
      <form>
    <ul>
       <input style={{marginTop:20,borderRadius:26,padding:"9px 70px 9px 19px"}}
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* <button onClick={loadBlogs} className="btn btn-primary">Search</button> */}
      </ul>
    </form>
    </div>
      <div>
        {items &&
          items.map((item, index) => {
            return (
              <div key={index} className="container-blog">
                <div className="fw-bold">Title: {item.title}</div>
                <blockquote className="blockquote mb-0">
                    <p className="mb-3">{item.details}</p>
                    <footer className="blockquote-footer m-2">
                      Posted on{" "}
                      <cite title="Source Title">
                        {convertTimestampToReadable(item.createdDate)}
                      </cite>
                      {console.log(typeof item.details)}
                    </footer>
                  </blockquote>
                <p
                  style={{
                    marginLeft: 70,
                    marginTop: 10,
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                ></p>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Search;
 