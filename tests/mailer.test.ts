// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const sendMail = vi.fn();
const createTransport = vi.fn(() => ({ sendMail }));
vi.mock("nodemailer", () => ({ default: { createTransport } }));

const { createMailer, smtpConfig } = await import("@/lib/mailer");

const smtpEnv = {
  SMTP_HOST: "smtp.hostinger.com",
  SMTP_PORT: "465",
  SMTP_USER: "johana@laborientation.com",
  SMTP_PASSWORD: "mot-de-passe-de-test",
};

const message = {
  to: "johana@laborientation.com",
  replyTo: "awa@exemple.com",
  subject: "Nouvelle demande : Awa Koffi",
  text: "Bonjour",
};

beforeEach(() => {
  sendMail.mockReset();
  createTransport.mockClear();
  vi.spyOn(console, "info").mockImplementation(() => {});
});

describe("smtpConfig", () => {
  it("lit les quatre variables", () => {
    expect(smtpConfig(smtpEnv)).toEqual({
      host: "smtp.hostinger.com",
      port: 465,
      user: "johana@laborientation.com",
      password: "mot-de-passe-de-test",
    });
  });

  it("ne renvoie rien tant que le mot de passe est vide", () => {
    expect(smtpConfig({ ...smtpEnv, SMTP_PASSWORD: "" })).toBeNull();
  });
});

describe("createMailer", () => {
  it("envoie par SMTP, en SSL, sous l’adresse contact@", async () => {
    await createMailer(smtpEnv).send(message);

    expect(createTransport).toHaveBeenCalledWith({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: { user: "johana@laborientation.com", pass: "mot-de-passe-de-test" },
    });
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: { name: "Lab’Orientation", address: "contact@laborientation.com" },
        to: "johana@laborientation.com",
        replyTo: "awa@exemple.com",
        subject: "Nouvelle demande : Awa Koffi",
        text: "Bonjour",
      }),
    );
  });

  it("se contente du journal sur l’ordinateur, sans configuration", async () => {
    await createMailer({}).send(message);

    expect(createTransport).not.toHaveBeenCalled();
    expect(console.info).toHaveBeenCalled();
  });

  it("échoue franchement sur Vercel sans configuration", async () => {
    await expect(createMailer({ VERCEL: "1" }).send(message)).rejects.toThrow(/SMTP/);
  });
});
