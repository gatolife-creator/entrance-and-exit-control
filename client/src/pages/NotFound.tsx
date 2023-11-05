import { Main } from "../components/Main";
import { RequireAuth } from "../components/RequireAuth";

export const NotFound = () => {
  return (
    <Main>
      <RequireAuth>
        <div className="text-center">
          <h1 className="text-4xl">Not Found</h1>
        </div>
      </RequireAuth>
    </Main>
  );
};
