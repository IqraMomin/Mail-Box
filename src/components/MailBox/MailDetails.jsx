import React, { useEffect } from "react";
import { useParams, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateReadStatus } from "../../store/mailAction";
import "./MailDetails.css"

const MailDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const mail = useSelector(state =>
    state.mail.inbox.find(item => item.id === id)
  );

  useEffect(() => {
    if (mail && !mail.isRead) {
      dispatch(updateReadStatus(id));
    }
  }, [dispatch, id, mail]);

  if (!mail) {
    return <p style={{ padding: "20px" }}>Mail not found</p>;
  }

  return (
    <div className="mail-details">
      <div className="mail-details-header">
        <div className="mail-details-subject">
          {mail.subject}
        </div>
        <button
          className="mail-close-btn"
          onClick={() => history.push("/inbox")}
          title="Back to Inbox"
        >
          ❌
        </button>
      </div>

      <div className="mail-details-meta">
        <span><strong>From:</strong> {mail.from}</span>
        <span><strong>Date:</strong> {mail.date}</span>
      </div>

      <hr className="mail-divider" />

      <div className="mail-details-body">
        {mail.body}
      </div>
    </div>
  );
}

export default MailDetails;