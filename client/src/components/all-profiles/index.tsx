import React from "react";
import { ProfileList, ProfilesWrapper } from "./styled";
import ProfileCard from "./ProfileCard";
import { useMembers } from "@/hooks/useMember";
import Link from "next/link";

const AllProfiles = () => {
  const { data } = useMembers();

  return (
    <ProfilesWrapper>
      <div className="heading">All Profiles</div>
      <ProfileList>
        {data?.data.map((member) => {
          return (
            <Link key={member.id} href={`/member/${member.id}`}>
              <ProfileCard member={member} />
            </Link>
          );
        })}
      </ProfileList>
    </ProfilesWrapper>
  );
};

export default AllProfiles;
