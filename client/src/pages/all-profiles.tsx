import AllProfiles from "@/components/all-profiles";
import useMember from "@/hooks/useMember";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const AllProfilePage = () => {
  const query = useMember();
  console.log(query);

  return (
    <>
      <AllProfiles />
    </>
  );
};

export default AllProfilePage;
