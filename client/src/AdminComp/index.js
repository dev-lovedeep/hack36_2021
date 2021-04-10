import React from "react";
import { Admin, Resource } from "react-admin";
import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import {
  AmbulanceCreate,
  AmbulanceEdit,
  AmbulanceList,
  AmbulanceShow,
} from "./Ambulance";
import {
  DiseaseCreate,
  DiseaseEdit,
  DiseaseList,
  DiseaseShow,
} from "./Disease";

import { DoctorCreate, DoctorEdit, DoctorList, DoctorShow } from "./Doctor";
import { DriverEdit, DriverList, DriverShow } from "./Driver";

export default function AdminComp() {
  return (
    <div>
      <Admin authProvider={authProvider} dataProvider={dataProvider}>
        <Resource
          name="ambulance"
          list={AmbulanceList}
          create={AmbulanceCreate}
          show={AmbulanceShow}
          edit={AmbulanceEdit}
        />
        <Resource
          name="disease"
          list={DiseaseList}
          create={DiseaseCreate}
          show={DiseaseShow}
          edit={DiseaseEdit}
        />
        <Resource
          name="doc"
          list={DoctorList}
          create={DoctorCreate}
          show={DoctorShow}
          edit={DoctorEdit}
        />
        <Resource
          name="driver"
          list={DriverList}
          show={DriverShow}
          edit={DriverEdit}
        />
      </Admin>
    </div>
  );
}
