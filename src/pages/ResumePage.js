import React, { useState, useRef } from "react";
import Acadamics from "../components/Acadamics";
import EmploymentSummary from "../components/EmploymentSummary";
import PersonalInfo from "../components/PersonalInfo";
import ProfessionalInfo from "../components/ProfessionalInfo";
import { Resume } from "../components/Resume";
import { useReactToPrint } from "react-to-print";
import ProgressBar from "../components/progress/ProgressBar";

export default function ResumePage() {
  const [page, setPage] = useState(0);
  const [image, setImage] = useState(null); 

  const [formData, setformData] = useState({
    fullname: "",
    email: "",
    phone: "",
    languages: [],
    professionalsummary: "",
    jobtitle: "",
    skills: [],
    employmentsummary: "",
    projectdetails: [
      {
        cname: "",
        pname: "",
        psummary: "",
        id: new Date().getTime() * Math.random() * 100000,
      },
    ],
    highestqualification: "",
    institute: "",
    certifications: [
      {
        cname: "certification 1",
        cval: "",
        id: new Date().getTime() * Math.random() * 100000,
      },
    ],
  });
  const titles = [
    "Personal Info",
    "Professional Info",
    "Employment Summary",
    "Acadamics",
    "Resume",
  ];
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const prevFunction = () => {
    if (page !== 0) {
      setPage(page - 1);
    }
  };
  const nextFunction = () => {
    if (page !== titles.length - 1) {
      setPage(page + 1);
    } else {
      handlePrint();
    }
  };

  const pageDisplay = () => {
    if (page === 0) {
      return <PersonalInfo formData={formData} setformData={setformData} image={image} setImage={setImage} />
      ;
    } else if (page === 1) {
      return <ProfessionalInfo formData={formData} setformData={setformData} />;
    } else if (page === 2) {
      return (
        <EmploymentSummary formData={formData} setformData={setformData} />
      );
    } else if (page === 3) {
      return <Acadamics formData={formData} setformData={setformData} />;
    } else {
      return (
        <Resume formData={formData} ref={componentRef} setPage={setPage} image={image} />
      );
    }
  };
  const automateForm = () => {
    setformData({
      fullname: "Shailesh Gaikwad",
      email: "Shaileshgaikwad8010@gmail.com",
      phone: "8010778440",
      languages: ["Enlgish", "Hindi", "Marathi", "Sanskrit"],
      professionalsummary:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit sunt id perferendis blanditiis corrupti voluptate pariatur corporis, voluptas a in aperiam fugiat culpa error! Inventore fugit eius architecto voluptate odio ipsum sint? Repellendus repellat tenetur nam dolorem excepturi minus qui deleniti, asperiores ipsa itaque quisquam quaerat fugit delectus officia laboriosam!",
      jobtitle: "Web developer",
      skills: ["Js", "React", "Css", "Node"],
      employmentsummary:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit sunt id perferendis blanditiis corrupti voluptate pariatur corporis, voluptas a in aperiam fugiat culpa error! Inventore fugit eius architecto voluptate odio ipsum sint? Repellendus repellat tenetur nam dolorem excepturi minus qui deleniti, asperiores ipsa itaque quisquam quaerat fugit delectus officia laboriosam!",
      projectdetails: [
        {
          cname: "Numetry Technologies",
          pname: "Frontend Development",
          psummary:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit sunt id perferendis blanditiis corrupti voluptate pariatur corporis, voluptas a in aperiam fugiat culpa error! Inventore fugit eius architecto voluptate odio ipsum sint? Repellendus repellat tenetur nam dolorem excepturi minus qui deleniti, asperiores ipsa itaque quisquam quaerat fugit delectus officia laboriosam!",
          id: 1234567890,
        },
      ],
      highestqualification: "B-tech",
      institute: "Shri Guru Gobind Singhji Institute Of Engineering And Technology",
      certifications: [
        {
          cname: "certification 1",
          cval: "Python-Intermediate",
          id: 1234567890,
        },
      ],
    });
  };
  console.log(page);

  return (
    <section className='container'>
      <div className='btn-auto btn btn-secondary' onClick={automateForm}>
        Autofill
        <i className='fas fa-magic ps-2'></i>
      </div>
      <div className='card text-center mt-3 top-box'>
        <div className={"card-header" + (page === 4 ? " d-none" : "")}>
         
          <ProgressBar titles={titles} page={page} />
        </div>

        <div className='card-body'>
          <h5 className='card-title'>{titles[page]}</h5>
          <div className='card-text'>{pageDisplay()}</div>
        </div>
        <div className='card-footer text-muted d-flex justify-content-evenly'>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={prevFunction}
          >
            Prev
          </button>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={nextFunction}
          >
            {page === titles.length - 1
              ? "Download"
              : page === titles.length - 2
              ? "Submit"
              : "Next"}
          </button>
        </div>
      </div>
    </section>
  );
}
