import React from "react";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
  withRouter,
} from "react-router-dom";

function Pagination(props) {
  //   console.log(props);
  let history = useHistory();
  let location = useLocation();
  let params = useParams();
  let match = useRouteMatch();
  console.log(history, location, params, match);
  const { pagename } = props;
  return (
    <div>
      <h1>{pagename}</h1>
    </div>
  );
}

// 教学方法:
// let newPagination = withRouter(Pagination);
// export default newPagination;

// 实际工作:
// export default withRouter(Pagination);

// hooks方法:
// useHistory
// useLocation
// useParams
// useRouteMatch
// 用法就不用我多说了吧
// 还是说一下吧，看上面
export default Pagination;
