import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectUserId, setUserId as setUser } from "../store/user.slice";
import { generateId } from "../utils/generateid";

export function useUserId(length: number = 8) {
  const dispatch = useAppDispatch();
  const existingUserId = useAppSelector(selectUserId);

  const [userId, setUserId] = useState(() => {
    if (!existingUserId) {
      const userId = generateId(length);
      dispatch(setUser(userId));
      return userId;
    }
    return existingUserId;
  });

  const regenerateUserId = useCallback(() => {
    const newId = generateId(length);
    dispatch(setUser(newId));
    setUserId(newId);
  }, [dispatch, length]);

  return { userId, regenerateUserId };
}
