import LoginContent from "./LoginContent";

const LoginPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) => {
  const params = await searchParams;
  const next = params.next?.startsWith("/") ? params.next : "/profile";
  return (
    <LoginContent next={next} />
  );
};

export default LoginPage;
