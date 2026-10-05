// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.fn();
vi.mock("@/lib/mailer", () => ({
  getMailer: () => ({ send }),
  INBOX: "johana@laborientation.com",
}));

const { POST } = await import("@/app/api/contact/route");

const request = {
  contactType: "parent",
  name: "Awa Koffi",
  whatsapp: "+2290197275797",
  email: "awa@exemple.com",
  formula: "cap-sur-soi",
  website: "",
  elapsedMs: 42_000,
};

const post = (body: unknown) =>
  POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  );

beforeEach(() => {
  send.mockReset();
  send.mockResolvedValue(undefined);
  vi.spyOn(console, "info").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("POST /api/contact", () => {
  it("envoie la demande à Johana, puis l’accusé de réception au visiteur", async () => {
    const response = await post(request);

    expect(response.status).toBe(200);
    expect(send).toHaveBeenCalledTimes(2);
    const [notification, confirmation] = send.mock.calls.map(([message]) => message);
    expect(notification).toMatchObject({
      to: "johana@laborientation.com",
      replyTo: "awa@exemple.com",
      subject: "Nouvelle demande de contact : Awa Koffi",
    });
    expect(notification.html).toContain("Awa Koffi vous a écrit depuis le site");
    /* Pas d’adresse de réponse différente de l’expéditeur : un signal d’arnaque
       pour les filtres. Les réponses vont à contact@, alias de Johana. */
    expect(confirmation).toMatchObject({ to: "awa@exemple.com" });
    expect(confirmation.replyTo).toBeUndefined();
    expect(confirmation.html).toContain("Merci, votre demande est bien arrivée");
  });

  it.each([
    ["le champ piège est rempli", { ...request, website: "https://spam.example" }],
    ["le formulaire est rempli en moins de 3 secondes", { ...request, elapsedMs: 1200 }],
    ["la demande ne vient pas du formulaire", { ...request, elapsedMs: undefined }],
  ])("répond « ok » sans rien envoyer quand %s", async (_, body) => {
    const response = await post(body);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(send).not.toHaveBeenCalled();
  });

  it("signale l’échec si l’e-mail à Johana ne part pas", async () => {
    send.mockRejectedValueOnce(new Error("SMTP indisponible"));

    const response = await post(request);

    expect(response.status).toBe(502);
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("confirme la demande même si l’accusé de réception ne part pas", async () => {
    send.mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error("Adresse inconnue"));

    const response = await post(request);

    expect(response.status).toBe(200);
    expect(send).toHaveBeenCalledTimes(2);
  });

  it("refuse une demande invalide, avec les erreurs par champ", async () => {
    const response = await post({ ...request, email: "awa" });

    expect(response.status).toBe(422);
    expect((await response.json()).errors.email).toBeTruthy();
    expect(send).not.toHaveBeenCalled();
  });
});
