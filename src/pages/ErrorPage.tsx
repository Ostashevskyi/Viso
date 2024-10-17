import Header from "../components/Header";

const ErrorPage = () => {
  return (
    <div className="text-center p-4 bg-background h-screen">
      <Header />
      <h1 className="text-3xl font-bold">Oops!</h1>
      <p className="mt-2">Something went wrong.</p>
    </div>
  );
};

export default ErrorPage;
