import {useState,useCallback} from 'react'

const useHttp= () => {
    const [isLoading, setIsLoading] = useState(false);

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
          const response = await fetch(requestConfig.url, {
            method: requestConfig.method ? requestConfig.method : 'GET',
            headers: requestConfig.headers ? requestConfig.headers : {},
            body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
          });
    
          if (!response.ok) {
            throw new Error('Request failed!');
          }
    
          const data = await response.json();
          applyData(data);
          setIsLoading(false);
      }, []);
    
    return {
        isLoading,
        sendRequest,
    }
}

export default useHttp;
