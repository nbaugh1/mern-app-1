// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Note from './pages/note';
import Edit from './pages/edit';
import Create from './pages/create';
// Import the Navbar, Nav and Container components from Bootstrap for a nice layout
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/">Notes</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="me-auto">
            <Nav.Link href="/notes/new">New</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes/:id" element={<Note />} />
        <Route path="/notes/new" element={<Create />} />
        <Route path="/notes/:id/edit" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;