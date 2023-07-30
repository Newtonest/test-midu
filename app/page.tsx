'use client';
import { useEffect, useState } from "react";
import { Person, PersonType } from "./types";

export default function Page() {
  const [personas, setPersonas] = useState<PersonType>([]);

  const restartData = () => {
    const newPeople = JSON.parse(localStorage.getItem("newPeople") || "[]");
    if(newPeople.length !== 0) {
      const people = JSON.parse(localStorage.getItem('personas') || "[]");
      localStorage.setItem("newPeople", JSON.stringify(people));
      setPersonas(people);
    } else {
      return;
    }
  }

  const deletePerson = (e: any) => {
    const apellido = e.target.className;
    const updatedPeople = JSON.parse(localStorage.getItem("newPeople") || "[]");
    const people = JSON.parse(localStorage.getItem("personas") || "[]");
    const newPeople =
      updatedPeople.length === 0
        ? people.filter((persona: Person) => persona.name.last !== apellido)
        : updatedPeople.filter((persona: Person) => persona.name.last !== apellido);
    localStorage.setItem("newPeople", JSON.stringify(newPeople));
    setPersonas(newPeople); // Update the component state here
  };

  useEffect(() => {
    const firstPeople = JSON.parse(localStorage.getItem("newPeople") || "[]");
    if (firstPeople.length === 0) {
      console.log("primer paso");
      const dataToSave = localStorage.getItem("personas");
      if (!dataToSave) {
        console.log("segundo paso");
        fetch("https://randomuser.me/api/?results=100")
          .then((res) => res.json())
          .then((data) => {
            const people = data.results;
            localStorage.setItem("personas", JSON.stringify(people));
            setPersonas(people);
          });
      } else {
        setPersonas(JSON.parse(dataToSave || "[]"));
      }
    } else {
      setPersonas(firstPeople);
    }
  }, []);

  return (
    <div className="app__container">
      <div onClick={restartData} className="restart__data">RESTART DATA</div>
      <div className="titles__container">
        <h6>FOTO</h6>
        <h6>NOMBRE</h6>
        <h6>APELLIDO</h6>
        <h6>PAIS</h6>
        <h6>ACCIONES</h6>
      </div>
      {personas?.map((person, idx) => (
        <div key={idx} className="person__container">
          <div className="person__container-foto">
            {
              <img src={person.picture.thumbnail} alt="foto" />
            }
          </div>
          <div className="person__container-nombre">{person.name.first}</div>
          <div className="person__container-apellido">{person.name.last}</div>
          <div className="person__container-pais">{person.location.country}</div>

          <div className="person__container-action">
            <div onClick={(e: any) => deletePerson(e)} className={person.name.last}>
              Delete
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
