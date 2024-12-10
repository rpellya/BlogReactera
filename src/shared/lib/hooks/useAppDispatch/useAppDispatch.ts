import { AppDispatch } from 'app/providers/StoreProvider';
import { useDispatch } from 'react-redux';

/**
 * Typical useDispatch<AppDispatch>
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
