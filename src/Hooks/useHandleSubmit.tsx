const useHandleSubmit = (
    handler: Hooks.HandleSubmit.Handler
): React.FormEventHandler<HTMLFormElement> => {
    return (e) => {
        e.preventDefault()
        handler(e)
    }
}

export default useHandleSubmit
