/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useState } from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Table,
  Button,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Icons = () => {
  const [copiedText, setCopiedText] = useState();

  const data = [
    {
      debtorName: "Mahi Patel",
      address: "Pune",
      amount: 450000,
      date: "01/08/2023",
      xyz: "dsjk kls ",
      link: "lkasd"
    },
    {
      debtorName: "Jaimin Patel",
      address: "Mumbai",
      amount: 550000,
      date: "01/10/2023",
      xyz: "dsjk kls ",
      link: "ssdfdf"
    }
  ]

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Garnishment Documents</h3>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Debtor Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                    <th scope="col">Completion</th>
                    <th scope="col">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => {
                    return(
                      <tr>
                        <td>{item.debtorName}</td>
                        <td>{item.address}</td>
                        <td>{item.amount}</td>
                        <td>{item.date}</td>
                        <td>{item.xyz}</td>
                        <td><Button><i className=""></i></Button></td>
                      </tr>
                    )
                  })}
                </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Icons;
