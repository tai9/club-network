import React from "react";
import { ProfileList, ProfilesWrapper } from "./styled";
import ProfileCard from "./ProfileCard";
import { useMembers } from "@/hooks/useMember";

const AllProfiles = () => {
  const { data } = useMembers();

  return (
    <ProfilesWrapper>
      <div className="heading">All Profiles</div>
      <ProfileList>
        {data?.data.map((member) => {
          return <ProfileCard key={member.id} member={member} />;
        })}
      </ProfileList>
    </ProfilesWrapper>
  );
};

export default AllProfiles;
