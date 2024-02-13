import {Link} from 'react-router-dom';
import { MediaItemWithOwner} from '../types/DBtypes';
import { useUserContext } from '../hooks/contextHooks';

const MediaRow = (props: {
  item: MediaItemWithOwner;
}) => {
  const {item}  = props;
  const {user} = useUserContext();
  console.log(user);

  return (
    <tr className="media-row">
      <td className="user_photo">
        <img className="user_photo"src={item.thumbnail} alt={item.title} />
      </td>
      <td className="username">
        {item.username}
      </td>
      <td>
        <Link className='bg-slate-700 p-2 hover:bg-slate-950' to="/single" state={item}>View</Link>
      {user && (user.user_id === item.user_id || user.level_name === 'Admin') &&(
        <>
        <button className='bg-slate-700 p-2 hover:bg-slate-950'
        onClick={() => console.log("modify", item)}>Modify</button>

        <button className='bg-slate-700 p-2 hover:bg-slate-950'
        onClick={() => console.log("delete", item)}>Delete</button>
        </>
        )}
      </td>
    </tr>
  );
};

export default MediaRow;
