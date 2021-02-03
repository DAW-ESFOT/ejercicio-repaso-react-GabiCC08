import React, {useEffect, useState} from 'react';
import '../styles/Book.css';
import {Card, Row, Col, Image, Button, Modal, Typography} from "antd";
const { Text, Link } = Typography;

function Book() {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(
                "https://stark-spire-22280.herokuapp.com/api/books"
            );
            const json = await response.json();
            console.log("json", json);
            setBooks(json.data);
            return json;
        };
        fetchBooks();
    }, []);

    function info(value) {
        Modal.info({
            title: 'Detalles del libro',
            content: (
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <h3>{value.title}</h3>
                        <h4>{value.author} - {value.year_edition}</h4>
                        <h3>${value.price}</h3>
                        <p>{value.synopsis}</p>
                        <h3>
                            Disponible:
                            {value.available === true ? <Text type="success"> Si</Text> : <Text type="danger"> No</Text>}
                        </h3>
                        <h3 strong class="details">Categoria: <Link>{value.category}</Link></h3>
                    </Col>
                    <Col span={6}>
                        <img src={value.cover_page} alt="Cover" width="150" height="110"/>
                    </Col>
                    <Col span={6}>
                        <img src={value.back_cover} alt="Back" width="150" height="110"/>
                    </Col>
                </Row>
            ),
            onOk() {
            },
        });
    }

    return (
        <>
            <h1 id="title-list">Book-Hi</h1>
            <Row id="container" gutter={[16, 16]} justify="center">
                {books.map((book) => (
                    <Col>
                        <Card style={{width: 480, height: 200}}>
                            <Row gutter={[8, 8]}>
                                <Col span={9}>
                                    <Image
                                        src={book.cover_page}
                                    />
                                </Col>
                                <Col span={15}>
                                    <h3>{book.title}</h3>
                                    <h4>{book.author} - {book.year_edition}</h4>
                                    <h3> ${book.price}</h3>
                                </Col>
                            </Row>
                            <div>
                                <Button type="primary" id="btn-details" onClick={() => info(book)}>VER MÁS</Button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Book;