import "./MailItem.css";
import { useDispatch } from "react-redux";
import { deleteFromDatabase } from "../../store/mailAction";

function MailItem({ item, onClick }) {
  const dispatch = useDispatch();

  const deleteHandler = (e) => {
    e.stopPropagation(); //  prevents opening mail
    dispatch(deleteFromDatabase(item.id));
  };

  return (
    <div
      className={`mail-row ${item.isRead ? "" : "unread"}`}
      onClick={onClick}
    >
      {/* LEFT */}
      <div className="mail-left">
        <input type="checkbox" />
        <span className="star">☆</span>
      </div>

      {/* SENDER */}
      <div className="mail-sender">{item.from}</div>

      {/* SUBJECT + PREVIEW */}
      <div className="mail-content">
        <span className="mail-subject">{item.subject}</span>
        <span className="mail-preview"> — {item.body}</span>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="mail-actions">
        <button className="delete-btn" onClick={deleteHandler}>
          🗑
        </button>
        <span className="mail-time">{item.date}</span>
      </div>
    </div>
  );
}

export default MailItem;
