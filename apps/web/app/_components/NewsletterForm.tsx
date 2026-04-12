"use client";

import { useNewsletterForm } from "../_hooks/useNewsletterForm";

export default function NewsletterForm() {
  const {
    name,
    email,
    status,
    message,
    isLoading,
    isDisabled,
    formRef,
    setName,
    setEmail,
    handleSubmit,
  } = useNewsletterForm();

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Imię"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <button type="submit" disabled={isDisabled}>
        {isLoading ? "Ładowanie..." : "Zapisz się"}
      </button>
      {message && <p className={`message message--${status}`}>{message}</p>}
    </form>
  );
}
