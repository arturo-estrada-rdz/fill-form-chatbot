import { Container, Navbar } from "react-bootstrap";
import { AIAssistantComponent } from "../chatbot/ai-assitant";

export const NavbarComponent = () => {
  return (
    <Navbar expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Fancy Form</Navbar.Brand>
        <AIAssistantComponent />
      </Container>
    </Navbar>
  );
};
