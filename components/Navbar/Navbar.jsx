import { getServerSession } from "next-auth";
import Button from "../Button";
import SubMenu from "./SubMenu";

export default async function Navbar() {
  const session = await getServerSession();

  const button = session ?
    <Button title={'Dashboard'} link={'/dashboard'} /> :
    <Button title={'Login'} link={'/login'} />

  return <SubMenu button={button} />;
}
