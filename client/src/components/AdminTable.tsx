export const AdminTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>名前</th>
            <th>学年</th>
            <th>クラス</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center space-x-3">
                <div>
                  <div className="font-bold">太郎一号</div>
                </div>
              </div>
            </td>
            <td>高校1年</td>
            <td>2組</td>
            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th>名前</th>
            <th>学年</th>
            <th>クラス</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
