import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'

function EditBook() {
    const [book, setBook] = useState({ title: "", quantity: 0 });
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:3001/books/${id}`)
            .then(response => setBook(response.data))
            .catch(error => console.error(error));
    }, [id]);
    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };
    const saveBook = () => {
        axios.put(`http://localhost:3001/books/${id}`, book)
            .then(() => {
                alert("Book updated successfully");
                navigate("/");
            })
            .catch(error => console.error(error));
    };
    return (
        <div>
            <h1>Edit</h1>
            <label>Title:</label>
            <input type="text" name="title" value={book.title} onChange={handleChange}/>
            <label>Quantity:</label>
            <input type="number" name="quantity" value={book.quantity} onChange={handleChange}/>
            <button onClick={saveBook}>Save</button>
        </div>
    );
}
export default EditBook;
