import React, {useEffect, useState} from "react";
import "../styles/App.css";
import Book from "./Book";
import {Layout, Pagination, Row, Space} from 'antd';

const {Header, Footer, Content} = Layout;

function App() {
    const [books, setBooks] = useState([]);
    const [pageInfo, setPageInfo] = useState([]);
    const [url, setUrl] = useState("https://stark-spire-22280.herokuapp.com/api/books")

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(
                "" + url
            );
            const json = await response.json();
            setBooks(json.data);
            setPageInfo(json.meta)
            return json;
        };
        fetchBooks();
    }, [url]);

    const handleChangeUrl = (current) => {
        setUrl(pageInfo.links[current].url);
    }
    return (
        <Layout className="App">
            <Header><h1 id="title-list">Book-Hi</h1></Header>
            <Content>
                <Row id="container" gutter={[16, 16]} justify="center">
                    {
                        books.map((book) => (
                                <Book key={book.id} book={book}/>
                            )
                        )
                    }
                </Row>
            </Content>
            <Footer>
                <Pagination
                    size="small"
                    responsive={true}
                    defaultCurrent={pageInfo.current_page}
                    total={pageInfo.total}
                    onChange={handleChangeUrl}/>
            </Footer>
        </Layout>
    );
}

export default App;