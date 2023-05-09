import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DynamicTable from "../../shared/DynamicTable";
import { useParams } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";

const Show = () => {
  const auth = getAuthUser();
  let { type } = useParams();
  if (type === undefined) {
    type = "instructor";
  }

  type = type.toLowerCase();

  const [data, setData] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setData({ ...data, loading: true });
    const link = `http://localhost:4000/view-${type}s`;
    axios
      .get(link, {
        headers: {
          token: auth.token,
        },
      })
      .then((res) => {
        setData({
          ...data,
          results: res.data,
          loading: false,
          err: null,
        });
      })
      .catch((error) => {
        console.log(error);
        setData({ ...data, loading: false, err: "Something went wrong" });
      });
  }, [type, data.reload]);

  const deleteData = (item) => {
    const link = `http://localhost:4000/delete-${type}`;
    setData({ ...data, loading: true });

    if (type === "course") {
      axios
        .delete(link, {
          data: { code: item },
          headers: {
            token: auth.token,
          },
        })
        .then((res) => {
          setData({ ...data, loading: false, reload: data.reload + 1 });
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 404) {
            setData({ ...data, loading: false, err: "Something Went Wrong" });
          } else {
            setData({ ...data, loading: false, err: error.response.data });
          }
        });
    } else {
      axios
        .delete(link, {
          data: { email: item },
          headers: {
            token: auth.token,
          },
        })
        .then((res) => {
          setData({ ...data, loading: false, reload: data.reload + 1 });
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 404) {
            setData({ ...data, loading: false, err: "Something Went Wrong" });
          } else {
            setData({ ...data, loading: false, err: error.response.data });
          }
        });
    }
  };

  if (Array.isArray(data.results)) {
    data.results.forEach((result) => {
      if (type === "course" && result["Instructor Email"] === null)
        result["Instructor Email"] = "none";

      result.Status =
        typeof result.Status === "number"
          ? result.Status === 1
            ? "Active"
            : "In-Active"
          : result.Status;
      result = Object.assign(result, {
        Update: (
          <Link to={`/Admin/Update/${type}/${result.Code || result.Email}`}>
            <i className="fa-solid fa-pen-to-square"></i>
          </Link>
        ),
        Delete: (
          <Link>
            <i
              className="fa-solid fa-trash"
              onClick={(e) => {
                deleteData(result.Code || result.Email);
              }}
            ></i>
          </Link>
        ),
      });
    });
  }

  return (
    <>
      {data.loading === false &&
        data.err === null &&
        Array.isArray(data.results) &&
        data.results.length > 0 &&
        DynamicTable(data.results, type)}

      {data.loading === false &&
        data.err === null &&
        !Array.isArray(data.results) &&
        data.results && (
          <Alert
            variant="info"
            style={{
              width: "50%",
              margin: "5% auto",
              textAlign: "center",
              zIndex: "-1",
            }}
          >
            {data.results}
          </Alert>
        )}

      {data.loading === false && data.err != null && (
        <>
          <Alert
            key="danger"
            variant="danger"
            style={{
              width: "50%",
              margin: "5% auto",
              textAlign: "center",
            }}
          >
            {data.err}
          </Alert>

          <br />
          <button className="showbtn" onClick={(e) => window.location.reload()}>
            Back
          </button>
          <br />
          <br />
        </>
      )}
    </>
  );
};
export default Show;
