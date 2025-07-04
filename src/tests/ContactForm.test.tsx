import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import ContactForm from "@/home/contact/contact-form/ContactForm";
import { ToastContainer } from "react-toastify";

async function simulateSubmition() {
  const submitButton = screen.getByRole('button', { name: /envoyer le message/i });
  await userEvent.click(submitButton);
}

describe("ContactForm", () => {
  it("should validate email", async () => {
    render(<ContactForm />);
    const emailInput = screen.getByLabelText('Email');
    await userEvent.type(emailInput, "my-invalid-email");

    await simulateSubmition();

    const errorMessage = await screen.findByText("Adresse email invalide");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should validate nom required", async () => {
    render(<ContactForm />);
    await simulateSubmition();

    const errorMessage = await screen.findByText("Le nom est requis");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should validate nom max length", async () => {
    render(<ContactForm />);
    const nomInput = screen.getByLabelText('Nom');
    await userEvent.type(nomInput, "a".repeat(51));
    await simulateSubmition();

    const errorMessage = await screen.findByText("Le nom ne doit pas dépasser 50 caractères");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should validate nom regex", async () => {
    render(<ContactForm />);
    const nomInput = screen.getByLabelText('Nom');
    await userEvent.type(nomInput, "N0M123?!");
    await simulateSubmition();

    const errorMessage = await screen.findByText(/Le nom ne doit contenir que \[ A-Z \| a-z \| - \| ' ' \]/);
    expect(errorMessage).toBeInTheDocument();
  });

  it("should validate sujet required", async () => {
    render(<ContactForm />);
    await simulateSubmition();

    const errorMessage = await screen.findByText("Le sujet est requis");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should validate message required", async () => {
    render(<ContactForm />);
    await simulateSubmition();

    const errorMessage = await screen.findByText("Le message est requis");
    expect(errorMessage).toBeInTheDocument();
  });

  it("Response should be successful on valid input", async () => {
    render(
    <>
      <ContactForm />
      <ToastContainer />
    </>);
    const nomInput = screen.getByLabelText('Nom');
    const emailInput = screen.getByLabelText('Email');
    const sujetInput = screen.getByLabelText('Sujet');
    const messageInput = screen.getByLabelText('Message');

    await userEvent.type(nomInput, "Mathias");
    await userEvent.type(emailInput, "admin@admin.io");
    await userEvent.type(sujetInput, "Test Subject");
    await userEvent.type(messageInput, "This is a test message.");

    await simulateSubmition();

    await screen.findByText("Votre message a bien été envoyé");
  });
});
