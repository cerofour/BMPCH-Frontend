import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { Card, CardBody } from "react-bootstrap";

import {
  TextsTable,
  UsersTable,
  CustomersTable,
} from "../components/AdminTables";
import { CustomModal } from "../components/CustomModals";
import { Button } from "react-bootstrap";
import { NewTextForm, NewUserForm, NewCustomerForm } from "../components/Form";

function PanelCard({ children }: any) {
  return (
    <Card>
      <CardBody>{children}</CardBody>
    </Card>
  );
}

function CRUDTabs() {
  const [showNewTextModal, setShowNewTextModal] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);

  const [reloadUsers, setReloadUsers] = useState(false);
  const [reloadTexts, setReloadTexts] = useState(false);
  const [reloadCustomers, setReloadCustomers] = useState(false);

  return (
    <Tabs
      defaultActiveKey="users"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="users" title="Usuarios">
        <PanelCard>
          <div className="my-2 d-flex justify-content-between">
            <h2>
              <b>Administrar usuarios</b>
            </h2>
            <Button onClick={() => setShowNewUserModal(true)}>
              Agregar usuario
            </Button>
          </div>

          <CustomModal
            show={showNewUserModal}
            setShow={setShowNewUserModal}
            title="Añadir nuevo usuario"
            form={NewUserForm}
            reload={reloadUsers}
            setReload={setReloadUsers}
          ></CustomModal>

          <UsersTable></UsersTable>
        </PanelCard>
      </Tab>
      <Tab eventKey="texts" title="Textos">
        <PanelCard>
          <div className="my-2 d-flex justify-content-between">
            <h2>
              <b>Administrar textos</b>
            </h2>
            <Button onClick={() => setShowNewTextModal(true)}>
              Agregar elemento
            </Button>
          </div>
          <CustomModal
            show={showNewTextModal}
            setShow={setShowNewTextModal}
            title="Añadir nuevo texto"
            form={NewTextForm}
            reload={reloadTexts}
            setReload={setReloadTexts}
          ></CustomModal>
          <TextsTable
            reload={reloadTexts}
            setReload={setReloadTexts}
          ></TextsTable>
        </PanelCard>
      </Tab>
      <Tab eventKey="customers" title="Clientes">
        <PanelCard>
          <div className="my-2 d-flex justify-content-between">
            <h2>
              <b>Administrar Clientes</b>
            </h2>
            <Button onClick={() => setShowNewCustomerModal(true)}>
              Agregar elemento
            </Button>
          </div>
          <CustomModal
            show={showNewCustomerModal}
            setShow={setShowNewCustomerModal}
            title="Añadir nuevo cliente"
            form={NewCustomerForm}
            reload={reloadCustomers}
            setReload={setReloadCustomers}
          ></CustomModal>
          <CustomersTable
            reload={reloadCustomers}
            setReload={setReloadCustomers}
          ></CustomersTable>
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
