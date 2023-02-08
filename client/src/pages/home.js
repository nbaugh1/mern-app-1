import { useEffect, useState } from 'react';
// Link component allow users to navigate to the blog note component page
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import http from '../lib/http';
// utility function to format the creation date
import formatDate from '../lib/formatDate';

const Home = () => {
    // useState allows us to make use of the component state to store the notes
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        // Call the server to fetch the notes and store them into the state
        async function fetchData() {
            const { data } = await http.get('/api/notes');
            setNotes(data.data.notes);
        }
        console.log("notes")
        fetchData();
    }, []);

    return (
        <>
            <Container className="my-5" style={{ maxWidth: '800px' }}>
                <h2 className="text-center">Note Pad</h2>
            </Container>
            <Container style={{ maxWidth: '800px' }}>
                <ListGroup variant="flush" as="ol">
                    {
                        notes.map((note) => {
                            // Map the notes to JSX
                            return (
                                <ListGroup.Item key={note._id}>
                                    <div className="fw-bold h3">
                                        <Link to={`/notes/${note._id}`} style={{ textDecoration: 'none' }}>{note.title}</Link>
                                    </div>
                                    <div>{note.author} - <span className="text-secondary">{formatDate(note.createdAt)}</span></div>
                                </ListGroup.Item>
                            );
                        })
                    }
                </ListGroup>
            </Container>
        </>
    );
};

export default Home;