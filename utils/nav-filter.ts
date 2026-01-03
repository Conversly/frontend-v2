import { NavItem } from "@/config/nav-config";
import { UserPermissions } from "@/lib/api/admin";

/**
 * Filter navigation items based on user permissions
 */
export const filterNavItemsByRole = (
  items: NavItem[],
  permissions: UserPermissions | null
): NavItem[] => {
  if (!permissions) return [];

  return items.filter((item) => {
    // Billing - Owner only
    if (item.url === "/billing") {
      return permissions.isOwner;
    }

    // Plans - Owner only
    if (item.url === "/plans") {
      return permissions.isOwner;
    }


    // Analytics - All authenticated users (data filtered by role)
    if (item.url === "/analytics") {
      return true;
    }

    // Audit Logs - Owner only
    if (item.url === "/audit-logs") {
      return permissions.isOwner;
    }

    // Manage - Owner only
    if (item.url === "/manage") {
      return permissions.isOwner;
    }

    // All other items are visible to all authenticated users
    return true;
  });
};
