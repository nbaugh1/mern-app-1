import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import http from '../lib/http';
import formatDate from '../lib/formatDate';

const Note = () => {
    const { id: noteId } = useParams();
    const [note, setNote] = useState({});
    const navigate = useNavigate();
    // Fetch the single blog note
    useEffect(() => {
        async function fetchData() {
            const { data } = await http.get(`/api/notes/${noteId}`);
            setNote(data.data.note);
        }
        fetchData();
    }, [noteId]);
    // Delete the note and redirect the user to the homepage
    const deleteNote = async () => {
        await http.delete(`/api/notes/${noteId}`);
        navigate('/');
    }


    return (
        <>
            <Container className="my-5 text-justified" style={{ maxWidth: '800px' }}>
                <h1>{note.title}</h1>
                <div className="text-secondary mb-4">{formatDate(note.createdAt)}</div>
                {note.tags?.map((tag) => <span>{tag} </span>)}
                <div className="h4 mt-5">{note.content}</div>
                <div className="text-secondary mb-5">- {note.author}</div>
                <div className="mb-5">
                    <Link
                        variant="primary"
                        className=" btn btn-primary m-2"
                        to={`/notes/${noteId}/edit`}
                    >
                        Edit
                    </Link>
                    <Button variant="danger" onClick={deleteNote}>Delete</Button>
                </div>
                <Link to="/" style={{ textDecoration: 'none' }}>&#8592; Back to Home</Link>
            </Container>
        </>
    );
};

export default Note;