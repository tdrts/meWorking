import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useState } from "react";

export function WelcomeScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)]">
      <header className="border-b border-border/60 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white shadow-card">
              W
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Work With Me
              </p>
              <h1 className="text-2xl font-semibold text-slate-900">
                Understand yourself. Help others work better with you.
              </h1>
            </div>
          </div>
          <Button variant="ghost" onClick={() => navigate("/preview")}>
            Preview example
          </Button>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-3xl border border-border/80 shadow-card">
          <CardHeader>
            <h2 className="text-3xl font-semibold text-slate-900">
              Build your Work With Me profile
            </h2>
            <p className="text-sm text-muted-foreground">
              Capture the principles, communication habits, and decision-making patterns that help teammates and copilots collaborate with you.
            </p>
          </CardHeader>
          <CardContent className="grid gap-6">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">
                Work email (optional)
              </span>
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              Skip for now
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate("/preview")}>
                Preview example
              </Button>
              <Button onClick={() => navigate("/dashboard")}>
                Start my profile
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
