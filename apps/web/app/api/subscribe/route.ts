import { NextResponse } from "next/server";

interface SubscribeRequestBody {
  name: string;
  email: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateInput(body);

    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { name, email } = validation.data;
    const result = await subscribeToMailerLite(name, email);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Błąd serwera. Spróbuj później." }, { status: 500 });
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

function isValidName(name: string): boolean {
  const trimmed = name.trim();
  return (
    trimmed.length >= 2 &&
    trimmed.length <= 100 &&
    /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s'-]+$/.test(trimmed)
  );
}

function validateInput(
  body: unknown
): { valid: false; error: string } | { valid: true; data: SubscribeRequestBody } {
  const data = body as SubscribeRequestBody;

  if (!data.name) {
    return { valid: false, error: "Imię jest wymagane" };
  }

  if (!isValidName(data.name)) {
    return { valid: false, error: "Imię powinno mieć 2-100 znaków" };
  }

  if (!data.email) {
    return { valid: false, error: "Email jest wymagany" };
  }

  if (!isValidEmail(data.email)) {
    return { valid: false, error: "Nieprawidłowy adres email" };
  }

  return { valid: true, data };
}

async function subscribeToMailerLite(name: string, email: string) {
  const apiKey = process.env.MAILERLITE_API_KEY;

  if (!apiKey) {
    throw new Error("Brakuje MAILERLITE_API_KEY");
  }

  const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ name: name.trim(), email: email.trim() }),
  });

  const data = await response.json();

  if (!response.ok) {
    const isDuplicate = response.status === 400 && data.message?.includes("already exists");

    if (isDuplicate) {
      return { success: true, message: "Ten email jest już zapisany!" };
    }

    throw new Error(`MailerLite error: ${data.message || "Nieznany błąd"}`);
  }

  return { success: true, message: "Zapisano pomyślnie!" };
}
