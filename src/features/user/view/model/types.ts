import type { User } from "@/entities/user";

export interface UserDetailsModalProps {
  isOpen: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onRetry: () => void;
}
