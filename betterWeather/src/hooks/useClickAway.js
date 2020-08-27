import { useEffect } from 'react'
function useClickAway(refArray, event, callback) {
    useEffect(() => {
        const handler = (event) =>  {
            if (refArray.every((v) => v.current && !v.current.contains(event.target))) {
                callback()
            }
        }
        // Bind the event listener
        document.addEventListener(event, handler);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener(event, handler);
        };
    }, [...refArray]);
}
export default useClickAway
//i obviously stole this from  https://stackoverflow.com/questions/32553158/detect-click-outside-react-component