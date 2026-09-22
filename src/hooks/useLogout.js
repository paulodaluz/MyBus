import { useRef } from 'react';
import { Alert } from 'react-native';
import { logout } from '../service/AuthService';

export function useLogout(navigation) {
	const pending = useRef(false);
	return async () => {
		if (pending.current) {
			return;
		}
		pending.current = true;
		try {
			await logout();
			navigation.reset({ index: 0, routes: [{ name: 'InitialPage' }] });
		} catch {
			Alert.alert('Não foi possível sair', 'Tente novamente para concluir a saída da conta.');
		} finally {
			pending.current = false;
		}
	};
}
