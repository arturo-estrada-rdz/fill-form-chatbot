import { Button, Card, Form, FormControl } from "react-bootstrap";
import { useApplicationForm } from "../../hooks/use-application-form";

export const ApplicationFormComponent = () => {
  const {
    register,
    handleSubmit,
    changeHandler,
    isLoading,
    formErrors,
    formValid,
    formValues,
  } = useApplicationForm();

  return (
    <Card style={{ width: "100%" }}>
      <Card.Body>
        <Card.Title className="text-center">Visa Application Form</Card.Title>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              isInvalid={!!formErrors.fullName}
              isValid={!!formValues?.fullName}
              {...register("fullName", {
                required: "This field is required",
                onChange: changeHandler,
              })}
            />
            {formErrors.fullName && (
              <FormControl.Feedback type="invalid">
                {formErrors.fullName.message}
              </FormControl.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="dateOfBirth">
            <Form.Label>Date of Birth:</Form.Label>
            <Form.Control
              type="text"
              placeholder="1991-01-01"
              isInvalid={!!formErrors.dateOfBirth}
              isValid={!!formValues?.dateOfBirth}
              {...register("dateOfBirth", {
                required: "This field is required",
                onChange: changeHandler,
              })}
            />
            {formErrors.dateOfBirth && (
              <FormControl.Feedback type="invalid">
                {formErrors.dateOfBirth.message}
              </FormControl.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="dateOfBirth">
            <Form.Label>Passport Number:</Form.Label>
            <Form.Control
              type="text"
              placeholder="AB1234567"
              isInvalid={!!formErrors.passportNumber}
              isValid={!!formValues?.passportNumber}
              {...register("passportNumber", {
                required: "This field is required",
                onChange: changeHandler,
              })}
            />
            {formErrors.passportNumber && (
              <FormControl.Feedback type="invalid">
                {formErrors.passportNumber.message}
              </FormControl.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="nationality">
            <Form.Label>Nationality:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your nationality"
              isInvalid={!!formErrors.nationality}
              isValid={!!formValues?.nationality}
              {...register("nationality", {
                required: "This field is required",
                onChange: changeHandler,
              })}
            />
            {formErrors.nationality && (
              <FormControl.Feedback type="invalid">
                {formErrors.nationality.message}
              </FormControl.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="purposeOfVisit">
            <Form.Label>Purpose of Visit:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Purpose of visit e.g. Tourism, Business"
              isInvalid={!!formErrors.purposeOfVisit}
              isValid={!!formValues.purposeOfVisit}
              {...register("purposeOfVisit", {
                required: "This field is required",
                onChange: changeHandler,
              })}
            />
            {formErrors.purposeOfVisit && (
              <FormControl.Feedback type="invalid">
                {formErrors.purposeOfVisit.message}
              </FormControl.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="durationOfStay">
            <Form.Label>Duration of Stay:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Duration of stay in days"
              isInvalid={!!formErrors.durationOfStay}
              isValid={!!formValues?.durationOfStay}
              {...register("durationOfStay", {
                required: "This field is required",
                onChange: changeHandler,
              })}
            />
            {formErrors.durationOfStay && (
              <FormControl.Feedback type="invalid">
                {formErrors.durationOfStay.message}
              </FormControl.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="contactInfo">
            <Form.Label>Contact Information:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your email or phone number"
              isInvalid={!!formErrors.contactInfo}
              isValid={!!formValues?.contactInfo}
              {...register("contactInfo", {
                required: "This field is required",
                onChange: changeHandler,
              })}
            />
            {formErrors.contactInfo && (
              <FormControl.Feedback type="invalid">
                {formErrors.contactInfo.message}
              </FormControl.Feedback>
            )}
          </Form.Group>

          <Button type="submit" disabled={isLoading || !formValid}>
            Submit form
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
