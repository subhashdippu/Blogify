import React from "react";

const BlogItem = ({ title, content, imageUrl, date, author }) => {
  return (
    <div className="card flex-1" style={{ width: "40rem" }}>
      <div className="card lg:card-side bg-base-100 shadow-sm">
        <figure style={{ width: "75%" }}>
          <img src={imageUrl} alt="Album" />
        </figure>
        <div className="card-body ">
          <h2 className="card-title">{title}</h2>
          <p>{content}</p>
          {author} | {date}
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
