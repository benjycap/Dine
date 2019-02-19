import TextField from "./TextField";

export default () => {
  return (
    <>
      <TextField label="Username" dataKey="username" />
      <TextField label="Password" type="password" dataKey="password" />
    </>
  );
}