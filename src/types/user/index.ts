export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin' | 'vendor';
  avatar: string;
  provider: 'local' | 'google' | 'facebook';
  providerId?: string;
  phone?: string;
  addresses: Address[];
 
  isDeleted:boolean;
  
}

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}