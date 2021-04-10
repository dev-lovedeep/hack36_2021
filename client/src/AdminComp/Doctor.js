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
  PasswordInput,
} from "react-admin";

export const DoctorList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="name" />
        <TextField source="licId" label="Licence Id" />
        <TextField source="phone" label="Phone" />
        <ShowButton basePath="/doc" />
        <DeleteButton basePath="/doc" />
        <EditButton basePath="/doc" />
      </Datagrid>
    </List>
  );
};

export const DoctorCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm redirect="/doc">
        <TextInput source="licId" validate={[required()]} />
        <PasswordInput source="password" validate={[required()]} />
        <TextInput source="name" validate={[required()]} />
        <TextInput source="phone" validate={[required()]} />
      </SimpleForm>
    </Create>
  );
};

export const DoctorShow = (props) => {
  return (
    <Show {...props} title="DoctorShow">
      <SimpleShowLayout>
        <TextField source="name" />
        <TextField source="licId" label="Licence Id" />
        <TextField source="phone" label="Phone" />
      </SimpleShowLayout>
    </Show>
  );
};

export const DoctorEdit = (props) => {
  return (
    <Edit title="Doctor Edit" {...props}>
      <SimpleForm redirect="/doc">
        <TextInput source="licId" validate={[required()]} />
        <TextInput source="name" validate={[required()]} />
        <TextInput source="phone" validate={[required()]} />
      </SimpleForm>
    </Edit>
  );
};
