import { Container, Navbar } from "react-bootstrap";

export const NavbarComponent = () => {
  return (
    <Navbar expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Fancy Form</Navbar.Brand>
      </Container>
    </Navbar>
  );
};
