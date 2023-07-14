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
import { LinearProgress } from "@mui/material";
import { EmailsContext } from "Context/EmailsContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { DocsContext } from "Context/DocsContext";

const Icons = () => {
  const [copiedText, setCopiedText] = useState();
  const {emails, setEmails} = useContext(EmailsContext);
  const {docs, setDocs} = useContext(DocsContext); 
  const params= useParams();
  const [temp,setTemp] = useState(0);

  const data = [
    ['Drake Musk','Microsoft', '$19501', '18 July 1999'],['Duke Musk','Infosys', '$46994', '22 October 2014'],['Emmy Zukerbuck','Google', '$3417', '22 Feb 2001'],['James court','Bank of America', '$33373','30 January 2003'],
    ['Joe Patkar','Google', '$25000', '15 July 2012'],['Mukul Waghmare','BlackRock', '$50000', '25 August 2008'],['Jaimin Pichai','TCS', '$26020', '01 Feb 2004'],['Harish Smith','Bank of Baroda', '$25000','30 December 1995']]
  

  useEffect(() => {
    for(let i=0;i< emails?.length; i++){
      if(emails[i].name === params["*"].split("/")[1]){
        setCopiedText(i);
        break;
      }
    }

    setTimeout(() => {
      let doc=docs;
      if(data)
      {console.log(doc);
      doc?.push(data[temp])
      setDocs(doc);}
      setTemp(temp+1);
    },5000)
  },[temp])

  const onDownload = async (fileName) => {
    const file = await axios.get('https://storage.googleapis.com/garnished-processed-pubic-docs/' + fileName,{headers: {
      'Content-Type': 'application/pdf',
    },});
  }



  
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
      {emails[copiedText]?.pause && <LinearProgress color="success" />}
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
                    <th scope="col">Debtor</th>
                    <th scope="col">Creditor</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                    <th scope="col">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {docs?.map((item) => {
                    return(
                      <tr>
                        <td>{item[0]}</td>
                        <td>{item[1]}</td>
                        <td>$ {item[2]}</td>
                        <td>{item[3]}</td>
                        <td><Button onClick={() => onDownload(item[4])}><i className="ni ni-cloud-download-95"></i></Button></td>
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
