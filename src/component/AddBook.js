import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'

function AddBook() {
    const [book, setBook] = useState({ title: "", quantity: 0 });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };
    const addBook = () => {
        axios.post("http://localhost:3001/books", book)
            .then(() => {
                alert("Thêm thành công !");
                navigate("/");
            })
            .catch(error => console.error(error));
    };
    return (
        <div>
            <h1>Add a new Book</h1>
            <label>Title:</label>
            <input type="text" name="title" value={book.title} onChange={handleChange}/>
            <label>Quantity:</label>
            <input type="number" name="quantity" value={book.quantity} onChange={handleChange}/>
            <button onClick={addBook}>Add</button>
        </div>
    );
}
export default AddBook;
