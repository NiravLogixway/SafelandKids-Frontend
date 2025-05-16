import {useState, useEffect, useMemo, useRef, useCallback} from 'react';

interface RequestOptions {
  skip?: boolean;
  onComplete?: (result: any) => void;
}

interface RequestRef {
  cacheKey: string;
  isInitial: boolean;
}

interface RequestResult<T> {
  data: T | undefined;
  loading: boolean;
  error: string | undefined;
  updateCache: (callback: (data: T | undefined) => T) => void;
  refetch: () => Promise<T | undefined>;
}

const useRequest = <T>(
  method: (params: any) => Promise<T>,
  params: Record<string, any> = {},
  options: RequestOptions = {},
): [T | undefined, RequestResult<T>] => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const cacheKey = JSON.stringify(params);
  const ref = useRef<RequestRef>(
    useMemo(() => {
      return {
        cacheKey,
        isInitial: true,
      };
    }, [cacheKey]),
  );
  const {current: refData} = ref;
  const isInitial = refData.isInitial;
  const {skip} = options;

  ref.current.isInitial = false;

  const request = useCallback(
    async (queryParams: Record<string, any>) => {
      try {
        setLoading(true);
        setError(undefined);
        const result = await method(queryParams);
        if (options.onComplete) {
          options.onComplete(result);
        }
        setData(result);
        return result;
      } catch (e) {
        const errorMessage =
          e instanceof Error ? e.message : 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [method, options],
  );

  useEffect(() => {
    const hasParamsChanged = refData.cacheKey !== cacheKey;
    if (hasParamsChanged) {
      ref.current.cacheKey = cacheKey;
    }
    if (options.skip) {
      setLoading(false);
    } else if (hasParamsChanged || (isInitial && !skip)) {
      request(params);
    }
  }, [
    skip,
    params,
    cacheKey,
    isInitial,
    options.skip,
    refData.cacheKey,
    request,
  ]);

  const resend = () => request(params);

  const updateCache = (callback: (data: T | undefined) => T) => {
    setData(callback(data));
  };

  return [
    data,
    {
      data,
      loading,
      error,
      updateCache,
      refetch: resend,
    },
  ];
};

export default useRequest;
