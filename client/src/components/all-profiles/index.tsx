import React from "react";
import { ProfileList, ProfilesWrapper } from "./styled";
import ProfileCard from "./ProfileCard";

const AllProfiles = () => {
  return (
    <ProfilesWrapper>
      <div className="heading">All Profiles</div>
      <ProfileList>
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
      </ProfileList>
    </ProfilesWrapper>
  );
};

export default AllProfiles;
