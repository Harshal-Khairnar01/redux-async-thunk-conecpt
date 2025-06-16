import "./App.css";
import { useDispatch, useSelector } from "react-redux";

import React, { useEffect } from "react";
import { loadPost } from "./slice/postSlice";

const App = () => {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadPost());
    }
  }, []);

  return (
    <div className="App">
      <h1>Async Thunk Redux</h1>
      <div>
        {posts?.posts?.length > 0 &&
          posts.posts.map((p) => (
            <div key={p.id}>
              <h4>{p.title}</h4>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
