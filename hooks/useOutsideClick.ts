import { useEffect } from "react"

const useOutsideClick = (ref: any, onClickOutside: any) => {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event: any) {
    if (ref.current && !ref.current.contains(event.target)) {
      onClickOutside()
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keypress", handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keypress", handleClickOutside)
    }
  })
}

export default useOutsideClick
