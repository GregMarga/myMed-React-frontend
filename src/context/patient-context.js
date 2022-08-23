import { createContext } from "react";

export const PatientContext = createContext({
    patientId: null,
    gender: null,
    createPatientId: () => { },
    setPatientIdNull: () => { },
    changeGender: () => { },
    setGenderNull: () => { }
});
