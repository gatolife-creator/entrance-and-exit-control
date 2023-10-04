import { AdminTable } from "../components/AdminTable";
import { RequireAuth } from "../components/RequireAuth";
import { Main } from "../components/Main";
import { RequireAdmin } from "../components/RequireAdmin";

export const AdminPage = () => {
  return (
    <Main>
      <RequireAuth>
        <RequireAdmin>
          <AdminTable />
        </RequireAdmin>
      </RequireAuth>
    </Main>
  );
};
