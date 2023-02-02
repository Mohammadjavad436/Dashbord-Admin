import React, { useEffect, useState } from "react";
import ErrorBox from "../Errorbox/Errorbox";
import DetailsModal from "../DetailsModal/DetailsModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
import "./Comments.css";

export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const [isShowDatailModal, setisShowDatailModal] = useState(false);
  const [isShowDeletelModal, setisShowDeletelModal] = useState(false);
  const [isShowEditModal, setisShoEditModal] = useState(false);
  const [isShowAcceptModal, setisShowAcceptModal] = useState(false);
  const [isShowRejectModal, setisShowRejectModal] = useState(false);
  const [mainCommentID, setmainCommentID] = useState("");
  const [mainCommentUpdate, setmainCommentUpdate] = useState({});
  const [mainCommentBody, setmainCommentBody] = useState("");

  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = () => {
    fetch("http://localhost:8000/api/comments")
      .then((res) => res.json())
      .then((comments) => setAllComments(comments));
  };

  const closeDatailModal = () => {
    setisShowDatailModal(false);
  };

  const closeDeleteModal = () => {
    setisShowDeletelModal(false);
  };

  const closeEditModal = () => {
    setisShoEditModal(false);
  };
  const closeAcceptModal = () => {
    setisShowAcceptModal(false);
  };

  const closeRejectModal = () => {
    setisShowRejectModal(false);
  };

  const acceptComment = () => {
    fetch(`http://localhost:8000/api/comments/accept/${mainCommentID}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("کامنت اکسپت شد");
        setisShowAcceptModal(false);
        getAllComments();
      });
  };

  const RejectComment = () => {
    fetch(`http://localhost:8000/api/comments/reject/${mainCommentID}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        setisShowRejectModal(false);
        getAllComments();
        console.log("کامنت رد شد ");
      });
  };

  const updateComment = (event) => {
    event.preventDefault();
    const NewCommentUpdate = {
      body: mainCommentBody,
      date: mainCommentUpdate.date,
      hour: mainCommentUpdate.hour,
      id: mainCommentUpdate.id,
      isAccept: mainCommentUpdate.isAccept,
      productID: mainCommentUpdate.productID,
      userID: mainCommentUpdate.userID,
    };

    fetch(`http://localhost:8000/api/comments/${mainCommentID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewCommentUpdate),
    })
      .then((res) => res.json)
      .then((result) => {
        getAllComments();
        setisShoEditModal(false);
        console.log("کامنت اپدیت شد");
      });
  };

  const deleteComment = () => {
    fetch(`http://localhost:8000/api/comments/${mainCommentID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        getAllComments();
        setisShowDeletelModal(false);
        console.log(result);
      });
  };

  return (
    <div className="cms-main">
      {allComments.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th>اسم کاربر</th>
              <th>محصول</th>
              <th>کامنت</th>
              <th>تاریخ</th>
              <th>ساعت</th>
            </tr>
          </thead>

          <tbody>
            {allComments.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.userID}</td>
                <td>{comment.productID}</td>
                <td>
                  <button
                    onClick={() => {
                      setisShowDatailModal(true);
                      setmainCommentBody(comment.body);
                    }}
                  >
                    دیدن متن
                  </button>
                </td>
                <td>{comment.date}</td>
                <td>{comment.hour}</td>
                <td>
                  <button
                    onClick={() => {
                      setisShowDeletelModal(true);
                      setmainCommentID(comment.id);
                    }}
                  >
                    حذف
                  </button>
                  <button
                    onClick={() => {
                      setisShoEditModal(true);
                      setmainCommentBody(comment.body);
                      setmainCommentID(comment.id);
                      setmainCommentUpdate(comment);
                    }}
                  >
                    ویرایش
                  </button>
                  <button>پاسخ</button>

                  {comment.isAccept === 0 ? (
                    <button
                      onClick={() => {
                        setisShowAcceptModal(true);
                        setmainCommentID(comment.id);
                      }}
                    >
                      تایید
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setisShowRejectModal(true);
                        setmainCommentID(comment.id);
                      }}
                    >
                      رد{" "}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg="هیچ کامنتی یافت نشد" />
      )}
      {isShowDatailModal && (
        <DetailsModal onHide={closeDatailModal}>
          <div className="flex-col justify-center items-center bg-white">
            <p className="text-modal">{mainCommentBody}</p>
            <button
              className="text-modal-close-btn"
              onClick={() => setisShowDatailModal(false)}
            >
              بستن
            </button>
          </div>
        </DetailsModal>
      )}

      {isShowDeletelModal && (
        <DeleteModal
          title="آیا از حذف مطمن هستید؟"
          cancleAction={closeDeleteModal}
          submitAction={deleteComment}
        />
      )}
      {isShowEditModal && (
        <EditModal
          onClose={closeEditModal}
          onSubmit={(event) => {
            updateComment(event);
          }}
        >
          <textarea
            value={mainCommentBody}
            onChange={(event) => setmainCommentBody(event.target.value)}
            className="w-full h-auto"
          ></textarea>
        </EditModal>
      )}
      {isShowAcceptModal && (
        <DeleteModal
          title="آیا از تایید مطمِن هستید؟"
          submitAction={acceptComment}
          cancleAction={closeAcceptModal}
        />
      )}
      {isShowRejectModal && (
        <DeleteModal
          title="آیا از تایید رد  مطمٍن هستید؟"
          submitAction={RejectComment}
          cancleAction={closeRejectModal}
        />
      )}
    </div>
  );
}
