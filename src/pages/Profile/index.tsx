import React, { useState } from "react";
import { Profiler } from "core/types/Profiler";
import Button from "core/components/Button";
import { Link } from "react-router-dom";
import makeRequest from "core/utils/request";
import ImageLoader from "./components/Loaders/ImageLoader";
import InfoLoader from "./components/Loaders/InfoLoader";
import dayjs from "dayjs";
import "./styles.scss";

type FormState = {
  name: string;
};

type FormEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

const Profile = () => {
  const [formData, setFormData] = useState<FormState>({
    name: "",
  });

  const handleOnChange = (event: FormEvent) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const [profiler, setProfiler] = useState<Profiler>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFind, setIsFind] = useState(false);

  const handleSubmit = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    setIsLoading(true);
    makeRequest({ url: `/users/${formData.name}` })
      .then((response) => {
        setProfiler(response.data);
      })
      .finally(() => {
        setIsLoading(false);
        setIsFind(true);
      });
  };

  return (
    <div className="profile">
      <form onSubmit={handleSubmit}>
        <div className="card-form">
          <p className="profile-text">Encontre um perfil Github</p>
          <input
            value={formData.name}
            onChange={handleOnChange}
            name="name"
            type="text"
            className="profile-input-text"
            placeholder="Usuário Github"
          />
          <button onClick={handleSubmit} className="button text-button">
            Encontrar
          </button>
        </div>
      </form>

      {isFind && (
        <div className="card-response">
          {isLoading ? (
            <ImageLoader />
          ) : (
            <>
              <div>
                <img
                  src={profiler?.avatar_url}
                  alt={profiler?.name}
                  className="profile-image"
                />
                <Link
                  to={{ pathname: profiler?.html_url }}
                  className="btn-profile"
                  target="_blank"
                >
                  <Button text="Ver Perfil" />
                </Link>
              </div>
            </>
          )}
          <div>
            {isLoading ? (
              <InfoLoader />
            ) : (
              <>
                <div className="profile-data">
                  <div className="profile-repositories">
                    Repositórios públicos: {profiler?.public_repos}
                  </div>
                  <div className="profile-followers">
                    Seguidores: {profiler?.followers}
                  </div>
                  <div className="profile-following">
                    Seguindo: {profiler?.following}
                  </div>
                </div>
                <div className="card-info">
                  <div className="info-title">Informações</div>
                  <div className="info-data">
                    <span>Empresa </span> : {profiler?.company}
                  </div>
                  <div className="info-data">
                    <span>Website/Blog </span> : {profiler?.blog}
                  </div>
                  <div className="info-data">
                    <span>Localidade </span> : {profiler?.location}
                  </div>
                  <div className="info-data">
                    <span>Membro desde </span> :&nbsp;
                    {profiler &&
                      dayjs(profiler?.created_at)
                        .locale("pt-br")
                        .format("DD/MM/YYYY")}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
