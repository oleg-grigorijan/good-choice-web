export interface UserPreview {
  id: string,
  firstName: string,
  lastName: string,
}

export enum UserRole {
  REVIEWER = "REVIEWER",
  BRAND_PRESENTER = "BRAND_PRESENTER",
  HR = "HR",
  MODERATOR = "MODERATOR",
  ADMINISTRATOR = "ADMINISTRATOR",
  SYSTEM = "SYSTEM",
}
