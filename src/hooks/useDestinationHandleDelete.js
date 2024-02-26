import { useAuthContext } from "./useAuthContext";
export const useHandleDelete = ({url, data, type, dispatch, setLoading, setError, closePopup, notify}) => {
    const user = useAuthContext();
    const remove = async () => {
        setLoading(true);
        const response = await fetch(url + data.id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.user.token}`
            }
        });

        const json = await response.json();

        if (json.success) {
            closePopup();
            setLoading(false);
            setError(null);
            dispatch({ type: type, payload: json.data[1] });
            notify.info(json.message);
        }
        if (!json.success) {
            setLoading(false);
            setError(json.error);
            notify.error(json.error);
        }
    }

    const handleRemove = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        await remove();
    }

    return { remove, handleRemove };
}