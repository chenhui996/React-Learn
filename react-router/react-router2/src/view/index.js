import React from "react";

function Index(props) {
  console.log(props);
  const { username } = props;
  return (
    <div>
      {username}
    </div>
  );
}

export default Index;
