import { AdminTable } from "../components/AdminTable";
import { Auth } from "../components/Auth";
import { Main } from "../components/Main";

export const AdminPage = () => {
  return (
    <Main>
      <Auth>
        <AdminTable />
      </Auth>
    </Main>
  );
};
