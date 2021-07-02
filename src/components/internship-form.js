import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./internship-form.css";

const InternshipForm = ({ sendRequest, universities }) => {
  const history = useHistory();
  const [inf, setInf] = useState({
    surname: "",
    nameUser: "",
    patronymic: "",
    dateOfBirth: "",
    education: "",
    yearGraduation: "",
    university: "",
    aboutCompany: "",
    courseSelect: "",
    region: "",
    comment: "",
  });

  const [genderInf, setGenderInf] = useState("male");
  const [testTask, setTestTask] = useState({
    showUpload: false,
    sendTask: false,
  });
  const [uploadFile, setUploadFile] = useState({
    newFile: "",
    uploadFileName: "",
  });
  const [otherAbout, setOtherAbout] = useState("");

  const onChangeInputText = (e) => {
    const { name, value } = e.target;
    setInf({ ...inf, [name]: value });
  };

  const onChangeOtherAbout = (e) => {
    setOtherAbout(e.target.value);
  };
  const onChangeRadio = (e) => {
    setGenderInf(e.target.id);
  };

  const onChangeTest = () => {
    setTestTask((prev) => {
      return { showUpload: true, sendTask: !prev.sendTask };
    });
  };

  const onChangeFile = (e) => {
    setUploadFile({
      newFile: e.target.files[0] ,
      uploadFileName: e.target.files[0].name,
    });

  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const aboutCompanyInf =
      inf.aboutCompany === "иное (указать, что именно)"
        ? otherAbout
        : inf.aboutCompany;
    const sendData = {
        id: Math.random().toFixed(1) * 100,
        ...inf,
        aboutCompany: aboutCompanyInf,
        genderInf,
        uploadFileName: uploadFile.uploadFileName,
        isSendTest: testTask.sendTask,
      };
    try {
      
      sendRequest(sendData);
      sessionStorage.setItem("req", JSON.stringify(sendData));
      history.replace(`/success`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form className="form" onSubmit={onSubmitHandler}>
      <h2 className="title">Заявка на стажировку</h2>
      <div className="wrapper">
        <div>
          <div className="input-group">
            <label className="label" htmlFor="surname">
              Фамилия
            </label>
            <input
              name="surname"
              value={inf.surname}
              type="text"
              min="3"
              max="48"
              pattern="^[А-Яа-яЁё\s]+$"
              onChange={onChangeInputText}
            />
            {inf.surname.length > 0 && inf.surname.length < 3 && (
              <small className="error_label">
                Длина должна быть не менее 3 символов
              </small>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="nameUser">Имя</label>
            <input
              name="nameUser"
              value={inf.nameUser}
              type="text"
              min="3"
              max="50"
              pattern="^[?!,.а-яА-ЯёЁ0-9\s]+$"
              onChange={onChangeInputText}
            />
            {inf.nameUser.length > 0 && inf.nameUser.length < 5 && (
              <small className="error_label">
                Длина должна быть не менее 5 символов
              </small>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="patronymic">Отчество</label>
            <input
              name="patronymic"
              type="text"
              value={inf.patronymic}
              onChange={onChangeInputText}
              pattern="^[?!,.а-яА-ЯёЁ0-9\s]+$"
            />
          </div>

          <div className="input-group">
            <label htmlFor="dateOfBirth">Дата рождения</label>
            <input
              name="dateOfBirth"
              type="date"
              required
              onChange={onChangeInputText}
            />
            {inf.dateOfBirth > "2005-07-02" && (
              <small className="error_label">
                Возраст не может быть меньше 18 лет
              </small>
            )}
          </div>

          <div className="input-group">
            <label>Пол</label>
            <p className="gender_wrapper">
              <input
                id="female"
                type="radio"
                className="radio_gender"
                name="gender"
                value={genderInf}
                onChange={onChangeRadio}
              />
              женский
            </p>
            <p className="gender_wrapper">
              <input
                id="male"
                type="radio"
                className="radio_gender"
                name="gender"
                value={genderInf}
                onChange={onChangeRadio}
              />
              мужской
            </p>
          </div>

          <div className="input-group">
            <label>Образование</label>
            <input
              list="education"
              name="education"
              type="text"
              required
              placeholder="Выбрать"
              onChange={onChangeInputText}
            />
            <datalist id="education" onChange={onChangeInputText}>
              <option value="среднее" />
              <option value="высшее" />
              <option value="средне-специальное" />
              <option value="неоконченное высшее" />
            </datalist>
          </div>
        </div>

        <div>
          <div className="input-group">
            <label htmlFor="yearGraduation">Год получения образования</label>
            <select
              name="yearGraduation"
              required
              className="yearGraduation"
              onChange={onChangeInputText}
            >
              <option value="">Выбрать</option>
              {Array.from(Array(2021).keys()).map((item, i) => {
                return (
                  <option key={i} value={item + 1}>
                    {item + 1}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="university">Университет</label>
            <input
              list="universities"
              name="university"
              className="input_university"
              type="text"
              onChange={onChangeInputText}
              placeholder="Выбрать"
            />
            <datalist
              id="universities"
              className="university_select"
              onChange={onChangeInputText}
            >
              {universities.map((item, i) => {
                return <option key={i} value={item} />;
              })}
            </datalist>
          </div>

          <div className="input-group">
            <label>Откуда узнали о компании</label>
            <select
              name="aboutCompany"
              className="about-company"
              onChange={onChangeInputText}
            >
              <option value="">Выбрать</option>
              <option value="интернет">интернет</option>
              <option value="реклама в авто">реклама в авто</option>
              <option value="рекомендаци друзей">рекомендаци друзей</option>
              <option value="иное (указать, что именно)">
                иное (указать, что именно)
              </option>
            </select>
            {inf.aboutCompany === "иное (указать, что именно)" && (
              <input
                name="aboutCompany"
                type="text"
                className="other_inf"
                onChange={onChangeOtherAbout}
                value={otherAbout}
                placeholder="Укажите откуда узнали"
              />
            )}
          </div>

          <div className="input-group">
            <label>Выбор курса для стажировки</label>
            <select
              name="courseSelect"
              className="course_select"
              onChange={onChangeInputText}
            >
              <option value="">Выбрать</option>
              <option value="web design и програмирование пользовательских интерфейсов">
                web design и програмирование пользовательских интерфейсов
              </option>
              <option value="разработка ПО">разработка ПО</option>
              <option value="тестирование програмного обеспечения">
                тестирование програмного обеспечения
              </option>
              <option value="графика и веб дизайн">графика и веб дизайн</option>
            </select>
          </div>

          <div className="input-group">
            <label>Регион обучения</label>
            <select name="region" onChange={onChangeInputText}>
              <option value="">Выбрать</option>
              <option value="Минск">Минск</option>
              <option value="Витебск">Витебск</option>
              <option value="Могилев">Могилев</option>
              <option value="Гродно">Гродно</option>
              <option value="Брест">Брест</option>
            </select>
          </div>

          <div className="input-group test-box_wrapper">
            <label>Тестовое задание: </label>
            <input
              id="yes"
              type="checkbox"
              className="radio_test"
              name="test"
              value={testTask.sendTask}
              onChange={onChangeTest}
            />
          </div>
          {testTask.showUpload && (
            <div className="input-group">
              <label htmlFor="uploadFile">Добавить вложение</label>
              <input
                name="file"
                type="file"
                className="upload"
                onChange={onChangeFile}
              />
            </div>
          )}
        </div>
      </div>

      <div className="input-group comment_wrapper">
        <label htmlFor="uploadFile">Дополнительные комментарии</label>
        <textarea
          name="comment"
          className="comment"
          onChange={onChangeInputText}
        />
      </div>

      <button type="submit" className="btn_send">
        Отправить
      </button>
    </form>
  );
};

export default InternshipForm;
