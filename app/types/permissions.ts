export interface CustomPermissionDto {
  canCreate: boolean;
  canDelete: boolean;
  canEdit: boolean;
  canView: boolean;
  facilityId?: string | null;
  featureId?: number | null;
  id?: string | null;
  menuId?: string | null;
  status?: number | null;
  userFacilityRoleId?: string | null;
}
