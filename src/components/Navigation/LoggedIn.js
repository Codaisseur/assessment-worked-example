import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

import { selectUser, selectIsArtist } from "../../store/user/selectors";
import { logOut } from "../../store/user/actions";


export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isArtist = useSelector(selectIsArtist);

  const loginLogoutControls = isArtist && (
    <Nav.Link href="/startAuction">Start an auction</Nav.Link>
  );

  return (
    <>
      {loginLogoutControls}
      <Nav.Item style={{ padding: ".5rem 1rem" }}>{user.email}</Nav.Item>
      <Button onClick={() => dispatch(logOut())}>Logout</Button>
    </>
  );
}
