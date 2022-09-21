import type {
  MemberDetailEntity,
  MemberEntity,
  MemberOrganization,
} from "@/models/member";

export const memberService = {
  async get(organization: string) {
    const membersResponse = await fetch(
      `https://api.github.com/orgs/${organization}/members`
    );
    const membersJson: MemberEntity[] = await membersResponse.json();
    const membersInfo: MemberEntity[] = await Promise.all(
      membersJson.map(async (member) => {
        const memberOrganizationResponse = await fetch(
          member.organizations_url
        );
        const memberOrganizations: MemberOrganization[] =
          await memberOrganizationResponse.json();
        return {
          ...member,
          organizations: memberOrganizations,
        };
      })
    );
    return membersInfo;
  },
  async getById(id: MemberDetailEntity["id"]) {
    const member: MemberDetailEntity = await fetch(
      `https://api.github.com/users/${id}`
    ).then((response) => response.json());
    return member;
  },
};
