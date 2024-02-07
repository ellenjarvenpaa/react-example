import {Link} from 'react-router-dom';
import { MediaItemWithOwner} from '../types/DBtypes';

const MediaRow = (props: {
  item: MediaItemWithOwner;
}) => {
  const {item}  = props;

  return (
    <tr className="media-row">
      <td className="user_photo">
        <img className="user_photo"src={item.thumbnail} alt={item.title} />
      </td>
      <td>
        {item.username}
      </td>
      <td>
        <Link to="/single" state={item}>View</Link>
      </td>
    </tr>
  );
};

export default MediaRow;
