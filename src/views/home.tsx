import {MediaItem, MediaItemWithOwner} from '../types/DBtypes';
import MediaRow from '../components/mediaRow';
import { useEffect, useState } from 'react';
import { fetchData } from '../lib/functions';
// import UserInfo from '../components/userInfo';

const Home = () => {
  const [mediaArray, setMediaArray] = useState<MediaItem[]>([]);

  const getMedia = async () => {
    try {
      const data = await fetchData<MediaItem[]>(import.meta.env.VITE_MEDIA_API + '/media')

      const dataWithOwner: MediaItemWithOwner = await Promise.all(data.map((item) => {
        const username = fetchData(import.meta.VITE_AUTH_API + '/users/' + item.user_id);
        const itemWithOwner: MediaItemWithOwner = item;

      }));

      setMediaArray(data);
      console.log('mediaArray', data);
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
      {/*  <thead>
         {mediaArray.map((item) => (
           <UserInfo
              key={item.user_id}
              item={item}
              />
         ))}
         </thead> */}
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
