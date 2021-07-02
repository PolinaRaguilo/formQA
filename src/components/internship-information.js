import { useState } from "react";
import { useParams } from "react-router-dom";
import "./internship-information.css";

const InternshipInformation = ({ sendRequest, universities }) => {
  const params = useParams();
  const [isEdit, setIsEdit] = useState(false);

  const [editInf, setEditInf] = useState(
    JSON.parse(sessionStorage.getItem("req"))
  );

  const {
    surname,
    nameUser,
    patronymic,
    dateOfBirth,
    education,
    yearGraduation,
    university,
    aboutCompany,
    courseSelect,
    region,
    comment,
    genderInf,
    isSendTest,
    uploadFileName,
  } = editInf;
  const [newAboutCompany, setNewAbout] = useState(aboutCompany);
  const [uploadNewFile, setUploadNewFile] = useState({
    newFileToUpload: null,
    uploadNewFileName: uploadFileName,
  });
  

  const onChangeInputText = (e) => {
    const { name, value } = e.target;
    setEditInf({ ...editInf, [name]: value });
  };

  const onNewAboutCompany = (e) => {
    setNewAbout(e.target.value);
  };

  const onEditHandler = (e) => {
    e.preventDefault();
    setIsEdit(true);
  };

  const aboutNewC =
    aboutCompany !== "иное (указать, что именно)"
      ? aboutCompany
      : newAboutCompany;

  const onSaveHandler = (e) => {
    e.preventDefault();
    setIsEdit(false);
    sendRequest({ ...editInf, aboutCompany: aboutNewC, uploadFileName: uploadNewFile.uploadNewFileName });
    sessionStorage.setItem(
      "req",
      JSON.stringify({ ...editInf, aboutCompany: aboutNewC,uploadFileName: uploadNewFile.uploadNewFileName })
    );
  };

  const onChangeFile = (e) => {
    setUploadNewFile({
      newFileName: e.target.files[0],
      uploadNewFileName: e.target.files[0].name,
    });
  };

  const aboutCompanyElement = aboutCompany !== "интернет" &&
    aboutCompany !== "реклама в авто" &&
    aboutCompany !== "рекомендаци друзей" && 
      <input
        name="aboutCompany"
        required
        type="text"
        style={{marginLeft: '15px'}}
        onChange={onNewAboutCompany}
        value={newAboutCompany}
      />
    ;
  const aboutCompanySelect = (
    <>
      <select
        name="aboutCompany"
        onChange={onChangeInputText}
        className="about-company"
        value={aboutCompany}
      >
        <option value="интернет">интернет</option>
        <option value="реклама в авто">реклама в авто</option>
        <option value="рекомендаци друзей">рекомендаци друзей</option>
        <option value="иное (указать, что именно)">
          иное (указать, что именно)
        </option>
      </select>
      {aboutCompanyElement}
    </>
  );

  const editUpload = <input type="file"  onChange={onChangeFile}/>
  return (
    <div className="information__wrapper">
      <h3>Информация о заявке №{params.requestId}</h3>
      <form onSubmit={onSaveHandler}>
        <ul>
          <li>
            Фамилия:
            {isEdit ? (
              <input
                name="surname"
                onChange={onChangeInputText}
                type="text"
                value={surname || ""}
                pattern="^[A-Za-zА-Яа-яЁё\s]+$"
              />
            ) : (
              surname
            )}
          </li>
          <li>
            Имя:
            {isEdit ? (
              <input
                name="nameUser"
                onChange={onChangeInputText}
                type="text"
                value={nameUser || ""}
                pattern="^[А-Яа-яЁё\s]+$"
              />
            ) : (
              nameUser
            )}
          </li>
          <li>
            Отчество:
            {isEdit ? (
              <input
                name="patronymic"
                onChange={onChangeInputText}
                type="text"
                value={patronymic || ""}
                pattern="^[А-Яа-яЁё\s]+$"
              />
            ) : (
              patronymic
            )}
          </li>
          <li>
            Дата рождения:
            {isEdit ? (
              <input
                name="dateOfBirth"
                onChange={onChangeInputText}
                type="date"
                value={dateOfBirth}
              />
            ) : (
              dateOfBirth
            )}
          </li>
          <li>Пол: {genderInf === "male" ? "мужской" : "женский"} </li>
          <li>Образование: {education}</li>
          <li>
            Год получения:
            {isEdit ? (
              <select
                name="yearGraduation"
                onChange={onChangeInputText}
                required
                className="yearGraduation"
                value={yearGraduation}
              >
                {Array.from(Array(2021).keys()).map((item,i) => {
                  return <option key={i} value={item + 1}>{item  + 1}</option>
                })}
              
              </select>
            ) : (
              yearGraduation
            )}
          </li>

          <li>
            Университет:
            {isEdit ? (
              <>
                <input
                  list="universities"
                  name="university"
                  type="text"
                  className="change_university"
                  value={university}
                  onChange={onChangeInputText}
                />
                <datalist id="universities">
                  {universities.map((item, i) => {
                    return <option key={i} value={item} />;
                  })}
                </datalist>
              </>
            ) : (
              university
            )}
          </li>
          <li>
            Откуда узнали о компании:
            {isEdit ? aboutCompanySelect : aboutNewC}
          </li>
          <li>
            Выбор курса стажировки:
            {isEdit ? (
              <select
                onChange={onChangeInputText}
                name="courseSelect"
                className="course_select"
                value={courseSelect}
              >
                <option value="">Выбрать</option>
                <option value="web design и програмирование пользовательских интерфейсов">
                  web design и програмирование пользовательских интерфейсов
                </option>
                <option value="разработка ПО">разработка ПО</option>
                <option value="тестирование програмного обеспечения">
                  тестирование програмного обеспечения
                </option>
                <option value="графика и веб дизайн">
                  графика и веб дизайн
                </option>
              </select>
            ) : (
              courseSelect
            )}
          </li>
          <li>Регион обучения: {region} </li>
          <li>Тестовое задание: {isSendTest ? "да" : "нет"} </li>
          {isSendTest ? <li>Вложение: {isEdit ?  editUpload : uploadNewFile.uploadNewFileName} </li> : null}
          
          <li>Комментарии: {comment} </li>
        </ul>

        <button onClick={onEditHandler}>Редактировать</button>
        <button type="submit">Схоранить</button>
      </form>
    </div>
  );
};

export default InternshipInformation;
