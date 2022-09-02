import { createContext } from "react";

export const PatientContext = createContext({
    patientId: null,
    gender: null,
    anamnistikoId: null,
    createPatientId: () => { },
    createAnamnistikoId: () => { },
    setAnamnistikoNull: () => { },
    setPatientIdNull: () => { },
    changeGender: () => { },
    setGenderNull: () => { }
});
