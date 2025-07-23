import { Container } from "react-bootstrap";
import { ApplicationFormComponent } from "./components/application-form/application-form";
import { AIAssistantComponent } from "./components/chatbot/ai-assitant";
import { NavbarComponent } from "./components/navbar/navbar";

function App() {
  return (
    <div className="App">
      <NavbarComponent></NavbarComponent>
      <Container className="mt-4 pt-1 pb-5 position-relative">
        <ApplicationFormComponent></ApplicationFormComponent>
        <AIAssistantComponent></AIAssistantComponent>
      </Container>
    </div>
  );
}

export default App;
