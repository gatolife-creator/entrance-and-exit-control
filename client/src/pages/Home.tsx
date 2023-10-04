import { RequireAuth } from "../components/RequireAuth";
import { Main } from "../components/Main";

export const Home = () => {
  return (
    <>
      <Main>
        <RequireAuth>TOP PAGE</RequireAuth>
      </Main>
    </>
  );
};
