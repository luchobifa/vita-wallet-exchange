import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <div className="flex flex-col items-center lg:items-start w-full lg:grid lg:grid-cols-12 lg:gap-5 lg:p-[120px_62px_110px_120px]">
      <div className="lg:col-span-4 w-fit">
        <h1 className="text-title lg:col-span-3 mb-12">Iniciar sesión</h1>
        <LoginForm />
      </div>

      <div className="lg:col-start-6 lg:col-end-12">
        <img
          src="/assets/login.png"
          alt="VitaWallet"
          className="object-contain"
        />
      </div>
    </div>
  );
};
