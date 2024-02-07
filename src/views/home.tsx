import { MediaItemWithOwner } from '../types/DBtypes';
import MediaRow from '../components/mediaRow';
import { useMedia } from '../hooks/apiHooks';

const Home = () => {

  const mediaArray: MediaItemWithOwner[] = useMedia();

  return (
    <>
      <table>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
