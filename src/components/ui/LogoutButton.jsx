'use client';
import { signOut } from '@/lib/auth-client';
import { HiLogout } from 'react-icons/hi';

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          fetchOptions: {
            onSuccess: () => {
              window.location.href = '/';
            },
          },
        })
      }
      className="btn btn-error btn-outline rounded-2xl px-10 gap-3 border-2 hover:bg-error hover:text-white transition-all"
    >
      <HiLogout size={20} /> Logout Account
    </button>
  );
}
