import { User } from "../types/DBtypes";

const UserInfo = (props: {
  item: User
}) => {
  const {item} = props;
  return (
    <tr className="user-row">
      <td>
        {item.username}
      </td>
    </tr>
  );
};

export default UserInfo;
