import React from "react";
import {
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  ImageField,
  List,
  number,
  NumberInput,
  required,
  SelectInput,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  ShowButton,
} from "react-admin";

export const DriverList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="name" />
        <TextField source="phone" />
        <ShowButton basePath="/driver" />
        <DeleteButton basePath="/driver" />
        <EditButton basePath="/driver" />
      </Datagrid>
    </List>
  );
};
export const DriverShow = (props) => {
  return (
    <Show {...props} title="DriverShow">
      <SimpleShowLayout>
        <TextField source="adhaar" />
        <TextField source="name" />
        <TextField source="phone" />
        <TextField source="dLicId" />
      </SimpleShowLayout>
    </Show>
  );
};

export const DriverEdit = (props) => {
  return (
    <Edit title="Driver Edit" {...props}>
      <SimpleForm redirect="/driver">
        <TextInput source="adhaar" validate={[required()]} />
        <TextInput source="name" validate={[required()]} />
        <TextInput source="phone" validate={[required()]} />
        <TextInput source="dLicId" validate={[required()]} />
      </SimpleForm>
    </Edit>
  );
};
