import "../style/Form.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import { useParams, useNavigate } from "react-router-dom";

const UpdateUser = (type) => {
  const auth = getAuthUser();
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    loading: false,
    success: "",
    error: "",
    status: "1",
  });

  const Update = (e) => {
    e.preventDefault();
    setUser({ ...user, loading: true, error: "", success: "" });
    const link = `http://localhost:4000/update-${type}`;
    axios
      .put(
        link,
        {
          name: user.name,
          email: user.email,
          password: user.password,
          phone: user.phone,
          status: user.status,
          oldEmail: id,
        },
        {
          headers: {
            token: auth.token,
          },
        }
      )
      .then((res) => {
        setUser({
          ...user,
          loading: false,
          error: "",
          success: res.data,
        });
        setTimeout(async () => {
          navigate(`/Admin/${type}`);
        }, 1000);
      })
      .catch((err) => {
        if (err.response.status === 409 || err.response.status === 400) {
          setUser({
            ...user,
            loading: false,
            error: err.response.data,
            success: "",
          });
        } else if (err.response.status === 422) {
          setUser({
            ...user,
            loading: false,
            error: err.response.data.errors[0].msg,
            success: "",
          });
        } else {
          setUser({
            ...user,
            name: "",
            password: "",
            email: "",
            phone: "",
            error: "Something Went Wrong",
            success: "",
            loading: false,
          });
          setTimeout(async () => {
            navigate(`/Admin/${type}`);
          }, 2000);
        }
      });
  };
  useEffect(() => {
    const link = `http://localhost:4000/get-${type}/${id}`;
    axios
      .get(link, {
        headers: {
          token: auth.token,
        },
      })
      .then((res) => {
        setUser({
          ...user,
          name: res.data[0].name,
          email: res.data[0].email,
          phone: res.data[0].phone,
          status: res.data[0].status,
          loading: false,
        });
      })
      .catch((err) => {
        setUser({
          ...user,
          name: "",
          password: "",
          email: "",
          phone: "",
          success: "",
          loading: false,
          error: "Something Went Wrong",
        });
        setTimeout(async () => {
          navigate(`/Admin/${type}`);
        }, 2000);
      });
  }, [id]);

  type = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <>
      <div className="admin-container">
        <div id="shared-table-p">Update {type}</div>
        {user.loading === false && user.error && (
          <Alert variant="danger" className="p-2">
            {user.error}
          </Alert>
        )}
        {user.loading === false && user.success && (
          <Alert variant="success" className="p-2">
            {user.success}
          </Alert>
        )}
        <form
          name="myForm"
          action="/action_page.php"
          className="admin-form"
          onSubmit={Update}
        >
          <div className="admin-row">
            <div className="admin-col-25">
              <label key="name" className="admin-label">
                Name
              </label>
            </div>
            <div className="admin-col-75">
              <input
                type="text"
                placeholder={`${type} Name`}
                id="name"
                className="admin-input-select"
                required
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
          </div>
          <div className="admin-row">
            <div className="admin-col-25">
              <label key="email" className="admin-label">
                Email
              </label>
            </div>
            <div className="admin-col-75">
              <input
                type="email"
                placeholder={`${type} Email`}
                id="email"
                className="admin-input-select"
                required
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-row">
            <div className="admin-col-25">
              <label key="password" className="admin-label">
                Password
              </label>
            </div>
            <div className="admin-col-75">
              <input
                type="password"
                placeholder={`${type} Password`}
                id="password"
                className="admin-input-select"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-row">
            <div className="admin-col-25">
              <label key="phone" className="admin-label">
                Phone
              </label>
            </div>
            <div className="admin-col-75">
              <input
                type="tel"
                placeholder={`${type} Phone`}
                id="phone"
                className="admin-input-select"
                required
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-row">
            <div className="admin-col-25">
              <label htmlFor="status" className="admin-label">
                Status
              </label>
            </div>
            <div className="admin-col-75">
              {user.status == "1" && (
                <>
                  <select
                    id="status"
                    name="status"
                    className="admin-input-select"
                    defaultValue="1"
                    onClick={(e) =>
                      setUser({
                        ...user,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="1">Active</option>
                    <option value="0">In-Active</option>
                  </select>
                </>
              )}
              {user.status == "0" && (
                <>
                  <>
                    <select
                      id="status"
                      name="status"
                      className="admin-input-select"
                      defaultValue="0"
                      onClick={(e) =>
                        setUser({
                          ...user,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="1">Active</option>
                      <option value="0">In-Active</option>
                    </select>
                  </>
                </>
              )}
            </div>
          </div>
          <div className="admin-row">
            <input
              type="submit"
              value="Submit"
              className="admin-submit"
              disabled={user.loading === true}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateUser;
