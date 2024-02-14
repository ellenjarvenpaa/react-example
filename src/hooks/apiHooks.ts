import {useEffect, useState} from 'react';
import {Like, MediaItem, MediaItemWithOwner, User} from '../types/DBtypes';
import {fetchData} from '../lib/functions';
import {Credentials} from '../types/LocalTypes';
import {LoginResponse, MediaResponse, MessageResponse, UploadResponse, UserResponse} from '../types/MessageTypes';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);

  const getMedia = async () => {
    try {
      const mediaItems = await fetchData<MediaItem[]>(
        import.meta.env.VITE_MEDIA_API + '/media',
      );
      // Get usernames (file owners) for all media files from auth api
      const itemsWithOwner: MediaItemWithOwner[] = await Promise.all(
        mediaItems.map(async (item) => {
          const owner = await fetchData<User>(
            import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
          );
          const itemWithOwner: MediaItemWithOwner = {
            ...item,
            username: owner.username,
          };
          return itemWithOwner;
        }),
      );
      setMediaArray(itemsWithOwner);
      console.log('mediaArray updated:', itemsWithOwner);
    } catch (error) {
      console.error('getMedia failed', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  const postMedia = async (file: UploadResponse, inputs: Record<string, string>,
    token: string) => {
      const media: Omit<MediaItem, 'media_id' | 'user_id' | 'thumbnail' | 'created_at'> = {
        title: inputs.title,
        description: inputs.description,
        filename: file.data.filename,
        filesize: file.data.filesize,
        media_type: file.data.media_type
      };
      const options = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(media),
      };
      return fetchData<MediaResponse>(
        import.meta.env.VITE_MEDIA_API + '/media',
        options,
      )
    };

  return {mediaArray, postMedia};
};

const useUser = () => {
  // TODO: implement network functions for auth server user endpoints
  const getUserByToken = async (token: string) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData<UserResponse>(
      import.meta.env.VITE_AUTH_API + '/users/token/',
      options,
    );
  };

  const postUser = async (user: Record<string, string>) => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    await fetchData<UserResponse>(
      import.meta.env.VITE_AUTH_API + '/users',
      options,
    );
  };

  const getUsernameAvailable = async (username: string) => {
    const result = await fetchData<{available: boolean}>(
      import.meta.env.VITE_AUTH_API + '/users/username/' + username
    );
    return result;
  };

  const getEmailAvailable = async (email: string) => {
    const result = await fetchData<{available: boolean}>(
      import.meta.env.VITE_AUTH_API + '/users/email/' + email
    );
    return result;
  };

  return {getUserByToken, postUser, getEmailAvailable, getUsernameAvailable};
};

const useAuthentication = () => {
  const postLogin = async (creds: Credentials) => {

      return await fetchData<LoginResponse>(
        import.meta.env.VITE_AUTH_API + '/auth/login',
        {
          method: 'POST',
          body: JSON.stringify(creds),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
  };

  return {postLogin};
};

const useFile = () => {

  const postFile = async (file: File, token: string) => {
   const formData = new FormData();
   formData.append('file', file);
   const options = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    body: formData,
   }
   return await fetchData<UploadResponse>(import.meta.env.VITE_UPLOAD_SERVER, options)
  };
  return {postFile};
}

const useLike = () => {
  const postLike = async (media_id: number, token: string) => {
    // Send a POST request to /likes with object { media_id } and the token in the Authorization header.
    const options: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({media_id}),
    };

    return await fetchData<MessageResponse>(
      import.meta.env.VITE_MEDIA_API + '/likes',
      options,
    );
  };

  const deleteLike = async (like_id: number, token: string) => {
    // TODO: Send a DELETE request to /likes/:like_id with the token in the Authorization header.
    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData<MessageResponse>(
      import.meta.env.VITE_MEDIA_API + '/likes/' + like_id,
      options,
    );
  };

  const getCountByMediaId = async (media_id: number) => {
    // TODO: Send a GET request to /likes/:media_id to get the number of likes.
    return await fetchData<{count: number}>(
      import.meta.env.VITE_MEDIA_API + '/likes/' + media_id
    );
  };

  const getUserLike = async (media_id: number, token: string) => {
    // TODO: Send a GET request to /likes/bymedia/user/:media_id to get the user's like on the media.
    const options: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData<Like>(
      import.meta.env.VITE_MEDIA_API + '/likes/bymedia/user/' + media_id,
      options,
    );
  };

  return {postLike, deleteLike, getCountByMediaId, getUserLike};
};

export {useMedia, useUser, useAuthentication, useFile, useLike};
