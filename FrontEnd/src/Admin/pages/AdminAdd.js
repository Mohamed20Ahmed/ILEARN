import AddCourse from "../components/AddCourse";
import AddUser from "../components/AddUser";

import { useParams } from "react-router-dom";

const AdminAdd = () => {
  let { type } = useParams();
  type = type.toLowerCase();
  if (type === "course") {
    return AddCourse();
  } else {
    return AddUser(type);
  }
};

export default AdminAdd;
