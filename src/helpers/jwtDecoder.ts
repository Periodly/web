import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: number;
  admin: boolean;
  username: string;
}

// generic type implementation
export default function jwtDecoder<T>(key: keyof DecodedToken): T | undefined {
  try {
    const decodedToken = jwtDecode<DecodedToken>(localStorage.getItem('token') || '');
    return decodedToken && (decodedToken[key] as T);
  } catch (err) {
    return undefined;
  }
}

export function hasAdminAccess() {
  return jwtDecoder<boolean>('admin') || false;
}

export function getUsername() {
  return jwtDecoder<string>('username');
}
