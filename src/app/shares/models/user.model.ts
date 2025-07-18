import { UserRole } from '../enums';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  drivingLicense: string;
  drivingLicenseExpiry: string;
}

export interface CreateUserPayload extends Omit<User, 'id' | 'role'> {
  password: string;
}
