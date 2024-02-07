import { useEffect, useState } from "react";
import { MediaItem, MediaItemWithOwner, User } from "../types/DBtypes";
import { fetchData } from "../lib/functions";
import { Credentials } from "../types/LocalTypes";
import { LoginResponse } from "../types/MessageTypes";

const useMedia = (): MediaItemWithOwner[] => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);

  const getMedia = async () => {
    try {
      const mediaItems = await fetchData<MediaItem[]>(import.meta.env.VITE_MEDIA_API + '/media');
      // Get usernames (file owners) for all media files from auth api
      const itemsWithOwner: MediaItemWithOwner[] = await Promise.all(mediaItems.map(async (item) => {
        const owner = await fetchData<User>(import.meta.env.VITE_AUTH_API + '/users/' + item.user_id);
        const itemWithOwner: MediaItemWithOwner = {...item, username: owner.username};
        return itemWithOwner;
      }));
      setMediaArray(itemsWithOwner);
      console.log('mediaArray updated:', itemsWithOwner);
    } catch (error) {
      console.error('getMedia failed', error);
    }
  };

  useEffect(()=>{
    getMedia
  }, []);

  return mediaArray;
}

const useUser = () => {
  // TODO: implement network connection for auth/user server
}

const useAuthentication = () => {
  const postLogin = async (creds) => {
    try {
      return await fetchData<LoginResponse>(
        import.meta.env.VITE_AUTH_API + '/auth/login', {method: 'POST', body: creds});
    } catch (error) {
      console.log(error);
    }
  };

  return (postLogin);
}

export {useMedia, useUser, useAuthentication};
