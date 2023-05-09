import updateCourse from "../components/updateCourse";
import updateUser from "../components/updateUser";
import { useParams } from "react-router-dom";

const AdminUpdate = () => {
  let { type } = useParams();
  type = type.toLowerCase();
  if (type === "course") {
    return updateCourse();
  } else {
    return updateUser(type);
  }
};

export default AdminUpdate;
