import { createContext } from "react";

export const PatientContext = createContext({
    patientId: null,
    gender: null,
    anamnistikoId: null,
    visitId: null,
    createPatientId: () => { },
    createAnamnistikoId: () => { },
    createVisitId: () => { },
    setAnamnistikoNull: () => { },
    setVisitNull: () => { },
    setPatientIdNull: () => { },
    changeGender: () => { },
    setGenderNull: () => { }
});
