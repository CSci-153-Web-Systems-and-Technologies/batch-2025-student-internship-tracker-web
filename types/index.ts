export type MembershipWithOrg ={
    org_id : string;
    organizations: {
    id: string;
    name: string;
    invite_code: string;
    created_by: string;
    created_at: string;
  };
};