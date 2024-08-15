import { useEffect } from 'react';

const useCustomCursor = (cursorUrl: string) => {
  useEffect(() => {
    const originalCursor = document.body.style.cursor;
    document.body.style.cursor = `url(${cursorUrl}) 0 44, auto`;

    return () => {
      document.body.style.cursor = originalCursor;
    };
  }, [cursorUrl]);
};

export default useCustomCursor;