import React, { useEffect, useState } from "react";
import illustration from "..//src/Images/undraw_education_f8ru.svg";
import axios from "axios";

const BooksForm = () => {
  const [newBooks, setNewBooks] = useState({
    title: "",
    author: "",
  });

  const [books, setBooks] = useState([]);
  const [newTitle, setTitle] = useState({
    title: "",
  });

  //Adding a book
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:4005/api/add-book",
      data: newBooks,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(newBooks);
    // setNewBooks({
    //   title: "",
    //   author: ""
    // })
    
  };

  // //Retrieving a book
  useEffect(() => {
    axios
      .get("http://localhost:4005/api/get-book")
      .then((response) => {
        console.log(response);
        console.log("It works!");
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Updating a book
  const handleUpdate = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:4005/api/update-book",
      data: newTitle,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(books);
  };

  //Deleting a book
  const handleDelete = () => {
    axios
      .post("http://localhost:4005/api/delete-book")
      .then((response) => {
        console.log(response);
        console.log("Deleted");
        setBooks("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="books-form">
      <div className="image">
        <img src={illustration} alt="illu" />
      </div>
      <h2>Books</h2>
      <h4>Add New Book</h4>
      <form>
        <input
          type="text"
          placeholder="Book Title"
          value={newBooks.title}
          name="title"
          onChange={(e) => setNewBooks({ ...newBooks, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBooks.author}
          name="author"
          onChange={(e) => setNewBooks({ ...newBooks, author: e.target.value })}
        />
        <button onClick={handleSubmit}>Add Book</button>
      </form>

      <h4>Update Book</h4>
      <form>
        <input
          type="text"
          placeholder="Book-Title"
          value={newTitle.title}
          name="title"
          onChange={(e) => setTitle({ ...newTitle, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={books.author}
          disabled={true}
          className="disabled-input"
          name="author"
          onChange={(e) => setBooks({ ...books, author: e.target.value })}
        />
        <button onClick={handleUpdate}>Update Book Title</button>
      </form>
      <h2>List of All Books</h2>
      <div className="list">
        <div className="title">
          <h5>Book Title</h5>
          <p></p>
        </div>
        <div className="author">
          <h5>Author</h5>
          <p></p>
        </div>
        <div className="delete-btn">
          <button onClick={handleDelete}>Delete book</button>
        </div>
      </div>
    </div>
  );
};

export default BooksForm;
