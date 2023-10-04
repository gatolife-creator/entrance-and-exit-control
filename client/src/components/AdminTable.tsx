import { ChangeEvent, FormEvent, useState } from "react";
import { useMembers } from "../hooks/useMembers";

export const AdminTable = () => {
  const { members, addMember } = useMembers();
  const [name, setName] = useState("");
  const [age, setAge] = useState(NaN);
  const [gender, setGender] = useState<"male" | "female">("male");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    addMember(name, age, gender);
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center py-10">部員管理</h1>
      <table className="table mb-10">
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
          {members.map(([, member], index) => (
            <tr key={index}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-bold">{member.name}</div>
                  </div>
                </div>
              </td>
              <td>{member.age}</td>
              <td>{member.gender}</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          ))}
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

      <button
        className="btn btn-success"
        onClick={() =>
          (
            document.getElementById("my_modal_1") as HTMLDialogElement
          ).showModal()
        }
      >
        部員追加
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">部員追加</h3>
          <form className="text-center space-y-2" onSubmit={submitHandler}>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              placeholder="名前"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              placeholder="年齢"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAge(Number(e.target.value))
              }
            />
            <select
              className="select select-bordered w-full max-w-xs"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setGender(e.target.value as "male" | "female")
              }
            >
              <option value="male">男性</option>
              <option value="female">女性</option>
            </select>
            <br />
            <button className="btn btn-primary">add</button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">閉じる</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
