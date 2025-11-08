import instance from './ApiConfig';

export const baseApiCall = async (config: any) => {
  // console.log('BaseApiCall.ts: baseApiCall(): config: ', config);
  return await new Promise(async (resolve, reject) => {
    await instance(config)
      .then(response => {
        // console.log('BaseApiCall.ts: baseApiCall(): response: ', response);
        if (response?.status === 200) {
          resolve(response?.data);
        } else if (response?.data?.status === 200) {
          resolve(response?.data);
        } else {
        }
      })
      .catch(async e => {
        console.log('BaseApiCall.ts: baseApiCall(): e: ', e);
        reject(e?.response?.data);
      });
  });
};
