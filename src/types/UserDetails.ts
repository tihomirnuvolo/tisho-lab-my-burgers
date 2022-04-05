import { Wallet } from "./Wallet";

export interface UserDetails {
  user_sys_id: string;
  name: string;
  wallets: Wallet[];
}
