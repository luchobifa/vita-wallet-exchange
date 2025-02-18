import { useState } from "react";
import { useAuth } from "../hooks/Auth.hooks";
import Button from "./Button";
import { Input } from "./Input";
import { authService } from "../services/AuthService";

export const LoginForm = () => {
  const { setAuth } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { user, headers } = await authService.signIn(form);
      setAuth(user, headers);
    } catch (err) {
      console.error("error", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-center">
          {error}
        </div>
      )}
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-caption mb-1">Email</label>
            <Input
              type="email"
              name="email"
              value={form.email}
              variant={
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
                  ? "success"
                  : "default"
              }
              placeholder="juan@gmail.com"
              inputSize="lg"
              required
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <label className="block text-caption mb-1">Password</label>
            <Input
              id="password"
              value={form.password}
              type="password"
              name="password"
              inputSize="lg"
              placeholder="Escribe tu contraseña"
              required
              variant={"password"}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />

            <a href="#" className="text-caption-2 text-end">
              Olvidaste tu contraseña?
            </a>
          </div>
        </div>
        <Button
          variant="primary"
          size="lg"
          type="submit"
          className="mt-14"
          disabled={loading}
        >
          Iniciar Sesión
        </Button>
      </form>
    </>
  );
};
