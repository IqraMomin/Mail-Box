import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./OpenMail.css";

function OpenMail({ type }) {
  const { mailId } = useParams();
  const history = useHistory();

  const mail = useSelector(state =>
    type === "sent"
      ? state.mail.sentbox.find(m => m.id === mailId)
      : state.mail.inbox.find(m => m.id === mailId)
  );

  if (!mail) return <p>Mail not found</p>;

  return (
    <div className="open-mail">
      <div className="open-mail-header">
        <button
          onClick={() =>
            history.push(
              type === "sent"
                ? "/mailbox/sent"
                : "/mailbox/inbox"
            )
          }
        >
          ✕
        </button>

        <h2>{mail.subject}</h2>
      </div>

      <div className="open-mail-meta">
        <p><strong>From:</strong> {mail.from}</p>
        <p><strong>To:</strong> {mail.receiver}</p>
        <p><strong>Date:</strong> {mail.date}</p>
      </div>

      <div className="open-mail-body">
        {mail.body}
      </div>
    </div>
  );
}

export default OpenMail;
