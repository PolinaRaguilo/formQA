import { Link } from "react-router-dom";
import './send-success.css';

const SendSuccess = (props) => {
  return (
    <div className="success-msg">
      <p>
        Спасибо за Вашу заявку! Просмотреть и отрелактировать вашу заявку можно
        по ссылке
      </p>
      <Link to={`/site/id/${props.request.id}`}>
        http://site/id/{props.request.id}
      </Link>
    </div>
  );
};

export default SendSuccess;
