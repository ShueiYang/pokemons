import { useEffect }  from "react";

export default function useClickOutside (ref, handler) {
    useEffect(() => {
        const closeDropdown = event => {
            if (!ref?.current?.contains(event.target)) {
                handler(event); 
            }
        } 
        document.addEventListener('click', closeDropdown)
        return () => document.removeEventListener('click', closeDropdown)
    },[ref, handler])
}    
        