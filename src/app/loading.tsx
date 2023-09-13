import Loading from "@/components/ui/Loading";
import React from "react";

type Props = {};

function loading({}: Props) {
  return (
    <div className="pt-[200px]">
      <Loading />
    </div>
  );
}

export default loading;
