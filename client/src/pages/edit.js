import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import http from '../lib/http';

const Edit = () => {
    const { id: noteId } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    // we call the API to fetch the blog note current data
    useEffect(() => {
        async function fetchData() {
            const { data } = await http.get(`/api/notes/${noteId}`);
            // by calling "reset", we fill the form fields with the data from the database
            reset(data.data.note);
        }
        fetchData();
    }, [noteId, reset]);

    const onSubmit = async ({ title, author, tags, content }) => {
        const payload = {
            title,
            author,
            tags: tags.split(',').map((tag) => tag.trim()),
            content,
        };
        await http.put(`/api/notes/${noteId}`, { data: payload });
        navigate(`/notes/${noteId}`);
    };

    return (
        <Container className="my-5" style={{ maxWidth: '800px' }}>
            <h1>Edit your note</h1>
            <Form onSubmit={handleSubmit(onSubmit)} className="my-5">
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" {...register('title')} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" placeholder="Enter author" {...register('author')} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Tags</Form.Label>
                    <Form.Control type="text" placeholder="Enter tags" {...register('tags')} />
                    <Form.Text className="text-muted">
                        Enter them separately them with ","
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Your content..." {...register('content')} />
                </Form.Group>
                <Button variant="primary" type="submit">Save</Button>
            </Form>
            <Link to="/" style={{ textDecoration: 'none' }}>&#8592; Back to Home</Link>
        </Container>
    );
};

export default Edit;