import { ChangeEvent, FormEvent, useState } from "react";
import { useMembers } from "../hooks/useMembers";
import { SerializedMemberType } from "../../../server/utils/member";

const MemberRow = ({
  memberData,
}: {
  memberData: [string, SerializedMemberType];
}) => {
  const [, member] = memberData;
  return (
    <tr>
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
  );
};

export const AdminTable = () => {
  const { members, addMember } = useMembers();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    addMember(name, parseInt(age), gender as "male" | "female");
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center py-10">部員管理</h1>
      <table className="table mb-10">
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
          {members.map((member, index) => (
            <MemberRow key={index} memberData={member} />
          ))}
        </tbody>
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
        onClick={() => {
          const modal = document.getElementById(
            "my_modal_1"
          ) as HTMLDialogElement;
          modal.showModal();
        }}
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
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              required
            />
            <input
              type="number"
              className="input input-bordered w-full max-w-xs"
              placeholder="年齢"
              value={age}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAge(e.target.value)
              }
              required
            />
            <select
              className="select select-bordered w-full max-w-xs"
              value={gender}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setGender(e.target.value)
              }
              required
            >
              <option value="male">男性</option>
              <option value="female">女性</option>
            </select>
            <br />
            <button type="submit" className="btn btn-primary">
              add
            </button>
          </form>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => {
                const modal = document.getElementById(
                  "my_modal_1"
                ) as HTMLDialogElement;
                modal.close();
                setName("");
                setAge("");
                setGender("male");
              }}
            >
              閉じる
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AdminTable;
