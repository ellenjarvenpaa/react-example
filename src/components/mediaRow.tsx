import {Link} from 'react-router-dom';
import {MediaItem} from '../types/DBtypes';

const MediaRow = (props: {
  item: MediaItem;
}) => {
  const {item}  = props;

  return (
    <tr className="media-row">
      <td className="user_photo">
        <img className="user_photo"src={item.thumbnail} alt={item.title} />
      </td>
      <td>
        <Link to="/single" state={item}>View</Link>
      </td>
    </tr>
  );
};

export default MediaRow;
