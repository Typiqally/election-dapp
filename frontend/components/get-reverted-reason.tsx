import React from "react";

const GetRevertedReason = (message: string) => {
  if (message == null) {
    return;
  }

  let revertedReason = message.substring(
    message.indexOf("'") + 1,
    message.lastIndexOf("'")
  );
  return (
    revertedReason
  );
}

export default GetRevertedReason;