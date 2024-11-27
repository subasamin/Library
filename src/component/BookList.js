import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'

function BookList() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3001/books")
            .then(response => setBooks(response.data))
            .catch(error => console.error(error));
    }, []);
    const deleteBook = (id) => {
        axios.delete(`http://localhost:3001/books/${id}`)
            .then(() => {
                alert("Delete successful");
                setBooks(books.filter(book => book.id !== id));
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Library</h1>
            <button onClick={() => navigate("/add")}>Add a new Book</button>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map(book => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.quantity}</td>
                        <td>
                            <button onClick={() => navigate(`/edit/${book.id}`)}>Edit</button>
                            <button onClick={() => deleteBook(book.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default BookList;
