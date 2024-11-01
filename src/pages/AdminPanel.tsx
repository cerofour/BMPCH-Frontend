import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { useState } from "react";

import { Card, CardBody, Button } from "react-bootstrap";
import { TextsTable, UsersTable } from "../components/AdminTables";
import { NewTextModal, NewUserForm, NewUserModal } from "../components/Form";

type PanelCardProps = {
  title: string;
  setShowModal: (x: boolean) => void;
  children: any;
};

function PanelCard({ title, setShowModal, children }: PanelCardProps) {
  return (
    <Card>
      <CardBody>
        <div className="my-2 d-flex justify-content-between">
          <h2>
            <b>{title}</b>
          </h2>
          <Button onClick={() => setShowModal(true)}>Agregar elemento</Button>
        </div>
        {children}
      </CardBody>
    </Card>
  );
}

function CRUDTabs() {
  const [showNewTextModal, setShowNewTextModal] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);

  return (
    <Tabs
      defaultActiveKey="users"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="users" title="Usuarios">
        <PanelCard
          title="Administrar usuarios"
          setShowModal={setShowNewUserModal}
        >
          <NewUserModal
            show={showNewUserModal}
            setShow={setShowNewUserModal}
          ></NewUserModal>
          <UsersTable></UsersTable>
        </PanelCard>
      </Tab>
      <Tab eventKey="texts" title="Textos">
        <PanelCard
          title="Administrar textos"
          setShowModal={setShowNewTextModal}
        >
          <NewTextModal
            show={showNewTextModal}
            setShow={setShowNewTextModal}
          ></NewTextModal>
          <TextsTable></TextsTable>
        </PanelCard>
      </Tab>
    </Tabs>
  );
}

export default function AdminPanel() {
  return (
    <>
      <div className="my-4">
        <h1>
          <b>Panel de Administrador</b>
        </h1>
      </div>
      <CRUDTabs></CRUDTabs>
    </>
  );
}
