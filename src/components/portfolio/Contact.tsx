import { useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Github, Linkedin, Mail, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact, contactForm } from "@/content/portfolio";
import { contactSchema, type ContactInput } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

type Errors = Partial<Record<keyof ContactInput, string>>;
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string }
  | { kind: "not-configured"; data: ContactInput };

const channels = [
  { key: "email", label: "Email", icon: Mail, value: contact.email, href: contact.email ? `mailto:${contact.email}` : null },
  { key: "github", label: "GitHub", icon: Github, value: contact.github, href: contact.github },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin, value: contact.linkedin, href: contact.linkedin },
] as const;

export function Contact() {
  const configured = Boolean(contactForm.endpoint);
  const [values, setValues] = useState<ContactInput>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const update = (field: keyof ContactInput) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactInput;
        next[key] ??= issue.message;
      }
      setErrors(next);
      setStatus({ kind: "idle" });
      return;
    }
    setErrors({});

    if (!contactForm.endpoint) {
      // No delivery service connected — be honest, never pretend it was sent.
      setStatus({ kind: "not-configured", data: parsed.data });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(contactForm.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          _subject: "New message from your portfolio",
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      const result = (await res.json()) as { success?: boolean | string; message?: string };
      if (result.success !== true && result.success !== "true") {
        throw new Error(
          result.message || "FormSubmit hasn't activated this form yet. Check your inbox for its verification email.",
        );
      }

      setStatus({ kind: "sent" });
      setValues({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "Your message couldn't be submitted. Please try again later.",
      });
    }
  };

  const mailto =
    status.kind === "not-configured" && contact.email
      ? `mailto:${contact.email}?subject=${encodeURIComponent(`Hello from ${status.data.name}`)}&body=${encodeURIComponent(
          `${status.data.message}\n\n— ${status.data.name} (${status.data.email})`,
        )}`
      : null;

  return (
    <section id="contact" aria-labelledby="contact-title" className="paper-grain relative overflow-hidden bg-primary py-24 text-primary-foreground sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -left-24 bottom-[-6rem] size-80 rounded-full border border-gold/20" />
      <div aria-hidden className="pointer-events-none absolute -left-10 bottom-[-3rem] size-52 rounded-full border border-gold/15" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeader
            index="07"
            label="Contact"
            title="Have Something in Mind?"
            titleId="contact-title"
            tone="dark"
            subtitle="I'm always open to interesting conversations, learning opportunities, and connecting with people who share an interest in technology."
          />

          <Reveal delay={120}>
            <ul className="mt-12 divide-y divide-primary-foreground/10 border-y border-primary-foreground/10">
              {channels.map(({ key, label, icon: Icon, value, href }) => (
                <li key={key} className="flex items-center gap-4 py-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-primary-foreground/15 text-gold-soft">
                    <Icon className="size-4" strokeWidth={1.6} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="eyebrow text-[0.6rem] text-primary-foreground/55">{label}</p>
                    {href && value ? (
                      <a
                        href={href}
                        target={key === "email" ? undefined : "_blank"}
                        rel={key === "email" ? undefined : "noopener noreferrer"}
                        className="link-underline mt-0.5 block truncate text-[0.98rem] font-medium"
                      >
                        {value.replace(/^https?:\/\/(www\.)?/, "")}
                      </a>
                    ) : (
                      <p className="mt-0.5 font-mono text-sm text-primary-foreground/60">{contact.placeholders[key]}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200} className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-lg bg-card p-6 text-card-foreground shadow-lift sm:p-9">
            {!configured && (
              <div className="mb-7 flex gap-3 rounded-md border border-dashed border-gold/70 bg-background px-4 py-3.5 text-sm">
                <Settings2 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <p className="text-foreground/80">
                  <strong className="font-semibold text-primary">Setup required.</strong> This form isn't connected to an
                  email service yet, so messages can't be delivered.
                </p>
              </div>
            )}

            <form noValidate onSubmit={onSubmit} className="space-y-5" aria-describedby="form-status">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Name" error={errors.name}>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    maxLength={100}
                    value={values.name}
                    onChange={update("name")}
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={inputClass(errors.name)}
                  />
                </Field>
                <Field id="email" label="Email" error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={255}
                    value={values.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass(errors.email)}
                  />
                </Field>
              </div>
              <Field id="message" label="Message" error={errors.message}>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  maxLength={1000}
                  value={values.message}
                  onChange={update("message")}
                  placeholder="What would you like to talk about?"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={cn(inputClass(errors.message), "resize-none py-3")}
                />
              </Field>

              <Button type="submit" variant="brand" size="xl" disabled={status.kind === "sending"} className="w-full sm:w-auto">
                {status.kind === "sending" ? "Sending…" : "Send Message"}
                <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
              </Button>

              <div id="form-status" aria-live="polite">
                {status.kind === "not-configured" && (
                  <div className="flex gap-3 rounded-md bg-secondary px-4 py-3.5 text-sm text-foreground/85">
                    <AlertCircle className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                    <p>
                      <strong className="font-semibold text-primary">Not sent.</strong> Message delivery isn't set up yet.{" "}
                      {mailto ? (
                        <a href={mailto} className="font-semibold text-primary underline underline-offset-4">
                          Open it in your email app instead
                        </a>
                      ) : (
                        "Please reach out through another channel for now."
                      )}
                    </p>
                  </div>
                )}
                {status.kind === "sent" && (
                  <div className="flex gap-3 rounded-md bg-secondary px-4 py-3.5 text-sm text-primary">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden />
                    <p>Thank you — the email service accepted your message.</p>
                  </div>
                )}
                {status.kind === "error" && (
                  <div className="flex gap-3 rounded-md border border-destructive/30 px-4 py-3.5 text-sm text-destructive">
                    <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
                    <p>{status.message}</p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function inputClass(error?: string) {
  return cn(
    "block w-full rounded-md border bg-background px-4 py-2.5 text-[0.95rem] text-foreground placeholder:text-muted-foreground/70 transition-[border-color,box-shadow] duration-300 focus:outline-none focus:ring-4",
    error
      ? "border-destructive/60 focus:border-destructive focus:ring-destructive/10"
      : "border-border focus:border-primary focus:ring-primary/10",
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string | undefined; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block text-[0.62rem] text-muted-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
