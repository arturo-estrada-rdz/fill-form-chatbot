import { Button, Card, Form } from "react-bootstrap";

export const ApplicationFormComponent = () => {
  return (
    <Card style={{ width: "100%" }}>
      <Card.Body>
        <Card.Title className="text-center">Visa Application Form</Card.Title>
        <Form noValidate>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="fullname"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="dateOfBirth">
            <Form.Label>Date of Birth:</Form.Label>
            <Form.Control
              type="text"
              placeholder="1991-01-01"
              name="dateOfBirth"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="dateOfBirth">
            <Form.Label>Passport Number:</Form.Label>
            <Form.Control
              type="text"
              placeholder="AB1234567"
              name="passportNumber"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="nationality">
            <Form.Label>Nationality:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your nationality"
              name="nationality"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="purposeOfVisit">
            <Form.Label>Purpose of Visit:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Purpose of visit e.g. Tourism, Business"
              name="purposeOfVisit"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="durationOfStay">
            <Form.Label>Duration of Stay:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Duration of stay in days"
              name="durationOfStay"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="contactInfo">
            <Form.Label>Contact Information:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your email or phone number"
              name="contactInfo"
            />
          </Form.Group>

          <Button type="submit">Submit form</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
