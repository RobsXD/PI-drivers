
export const ValidateName = (e) => {
  function isNameCorrect(value) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]*$/;
    return regex.test(value);
  }

  if (e.name.length === 0) return "Este campo es obligatorio";
  if (e.name.length < 3) return "Debe contener al menos 3 caracteres";
  if (e.name.length > 15) return "Debe contener menos de 15 caracteres";
  if (!isNameCorrect(e.name)) return "Solo se permiten letras y acentos";
  else return ;
};

export const ValidateLastName = (e) => {
  function isNameCorrect(value) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]*$/;
    return regex.test(value);
  }
  if (e.lastName.length === 0) return "Este campo es obligatorio";
  if (e.lastName.length < 3) return "Debe contener al menos 3 caracteres";
  if (e.lastName.length > 15) return "Debe contener menos de 15 caracteres";
  if (!isNameCorrect(e.lastName)) return "Solo se permiten letras y acentos";
  else return  ;
};

export const ValidateImage = (e) => {
  const regex = /\.(jpg|jpeg|png)$/i;

  if (e.image.length === 0) return "Este campo es obligatorio";

  if (!regex.test(e.image)) return "Formato de imagen inválido";

  if (e.image.length < 10) return "Debe contener al menos 10 caracteres";
  else return  ;
};

export const ValidateDescription = (e) => {
  function isDescriptionCorrect(value) {
    const regex = /^[a-zA-Z\s,áéíóúÁÉÍÓÚ]*$/;
    return regex.test(value);
  }

  if (e.description.length < 10) return "Debe contener al menos 10 caracteres";

  if (e.description.length > 200) return "Debe contener menos de 200 caracteres";

  if (!isDescriptionCorrect(e.description))
    return "Solo se permiten letras, comas y acentos";
  else return  ;
};

export const validateNationality = (e) => {
  function isNationality(value) {
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(value);
  }

  if (e.nationality.length === 0) return "Este campo es obligatorio";
  if (e.nationality.length < 3) return "Debe contener al menos 3 caracteres";
  if (e.nationality.length > 15) return "Debe contener menos de 15 caracteres";
  if (!isNationality(e.nationality)) return "Solo se permiten letras";
  return  ;
};

export const validateBirthdate = (e) => {
  function isBirthdateCorrect(value) {
    const regex =
      /^(18[8-9][7-9]|19\d\d|200[0-2])-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    return regex.test(value);
  }

  if (e.birthdate.length === 0) return "Este campo es obligatorio";
  if (!isBirthdateCorrect(e.birthdate)) return "Debe ser entre 1887 y 2002";

  return  ;
};

import React from 'react'

export const ValidateTeams = (e) => {
  console.log(e.teams);
  if (e.teams.length === 0) return "Selecciona al menos uno";

  if (e.teams.length > 5) return "No puedes seleccionar más de 5";
  return  ;
}
