export interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
  organizations_url: string;
  organizations: MemberOrganization[];
}

export interface MemberOrganization {
  login: string;
}

export interface MemberDetailEntity {
  id: string;
  login: string;
  name: string;
  company: string;
  bio: string;
}
