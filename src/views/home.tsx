import {MediaItem} from '../types/DBtypes';
import MediaRow from '../components/mediaRow';
import { useEffect, useState } from 'react';
import { fetchData } from '../lib/functions';
// import UserInfo from '../components/userInfo';

const Home = () => {
  const [mediaArray, setMediaArray] = useState<MediaItem[]>([]);

  const getMedia = async () => {
    try {
      const data = await fetchData<MediaItem[]>('data.json')
      setMediaArray(data);
    } catch (error) {
      console.log(error);
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
