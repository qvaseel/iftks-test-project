import type { User, UserModalErrorKey } from "@/entities/user";

export interface UserDetailsModalProps {
  isOpen: boolean;
  user: User | null;
  isLoading: boolean;
  error: UserModalErrorKey | null;
  onClose: () => void;
  onRetry: () => void;
}
