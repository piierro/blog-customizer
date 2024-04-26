import { useEffect } from "react";

// Обработка клика вне сайдбара
export const useOutsideClick = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, callback]);
  };

  // const handleClickOutside = (event: MouseEvent) => {
	// 	if (ref.current && !ref.current.contains(event.target as Node)) {
	// 	  setIsSidebarOpen(false);
	// 	}
	// };
    
	// // Добавляем обработчик клика вне сайдбара при монтировании компонента
	// useEffect(() => {
	// 	document.addEventListener('mousedown', handleClickOutside);
	// 	return () => {
	// 	  document.removeEventListener('mousedown', handleClickOutside);
	// 	};
	// }, []);