import UserForm from "./UserForm";
import Submit from "./RegisterSubmit";
import TextField from "./TextField";

export default () => (
  <>
    <TextField label="Name" dataKey="name" />
    <TextField label="Location" dataKey="location" />
    <UserForm />
    <Submit />
  </>
);
