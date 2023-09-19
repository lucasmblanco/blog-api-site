import axios from "axios";

export async function likePost({ id }: { id: string }) {
    try {
      const response = await axios.post(
          `https://blog-api-ol7v.onrender.com/v1/posts/${id}/likes`,
          {},
          {
              headers: {
                  'Content-Type': 'application/json'
              },
              withCredentials: true
          }
      );
      const responseMessage = await response.data?.message;
      return responseMessage;
  } catch (err) {
      console.log(err);
  }
  }
  
export async function likeComment({id} : { id: string}) {
    try {
      const response = await axios.post(
          `https://blog-api-ol7v.onrender.com/v1/comments/${id}/likes`,
          {},
          {
              headers: {
                  'Content-Type': 'application/json'
              },
              withCredentials: true
          }
      );
      const responseMessage = await response.data?.message;
      return responseMessage;
  } catch (err) {
      console.log(err);
  }
  }
  
export async function dislikePost({id} : { id: string}) {
    try {
      const response = await axios.delete(
          `https://blog-api-ol7v.onrender.com/v1/posts/${id}/likes`,
          {
              headers: {
                  'Content-Type': 'application/json'
              },
              withCredentials: true
          }
      );
      const responseMessage = await response.data?.message;
      return responseMessage;
  } catch (err) {
      console.log(err);
  }
  }
  
export async function dislikeComment({id} : { id: string}) {
    try {
      const response = await axios.delete(
          `https://blog-api-ol7v.onrender.com/v1/comments/${id}/likes`,
          {
              headers: {
                  'Content-Type': 'application/json'
              },
              withCredentials: true
          }
      );
      const responseMessage = await response.data?.message;
      return responseMessage;
  } catch (err) {
      console.log(err);
  }
  }