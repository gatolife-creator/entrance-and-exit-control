import { AdminTable } from "../components/AdminTable";
import { Auth } from "../components/Auth";

export const AdminPage = () => {
  return (
    <div className="container mx-auto">
      <Auth>
        <AdminTable />
      </Auth>
    </div>
  );
};
