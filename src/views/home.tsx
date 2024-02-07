import {MediaItem, MediaItemWithOwner} from '../types/DBtypes';
import MediaRow from '../components/mediaRow';
import { useEffect, useState } from 'react';
import { fetchData } from '../lib/functions';

const Home = () => {
  const [mediaArray, setMediaArray] = useState<MediaItem[]>([]);

  const getMedia = async () => {
    try {

      const data = await fetchData<MediaItem[]>(import.meta.env.VITE_MEDIA_API + '/media')

      const dataWithOwner: MediaItemWithOwner[] = await Promise.all(data.map(async (item) => {
        const owner = await fetchData(import.meta.env.VITE_AUTH_API + '/users/' + item.user_id);
        const itemWithOwner: MediaItemWithOwner = {...item, username: owner.username};
        return itemWithOwner;
      }));

      setMediaArray(data);
      console.log('mediaArray');
    } catch (error) {
      console.log('getMedia failed', error);
    }
  };

  useEffect(()=>{
    getMedia
  }, []);


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
