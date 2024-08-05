import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Email {
  id: string;
}

interface EmailDetails {
  APAccountRef: string;
  VendorRef: string;
  ShipTo: string;
  TotalAmt: string;
  Line: any;
}

const EmailToPO: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [emailDetails, setEmailDetails] = useState<Partial<EmailDetails>>({});
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch the list of emails when the component is mounted
    axios.get('http://127.0.0.1:8000/get_emails')
      .then(response => {
        setEmails(response.data);
      })
      .catch(error => {
        console.error('Error fetching emails:', error);
      });
  }, []);

  const handleProcessClick = (emailId: string) => {
    setLoading(true);
    setShowDialog(true);
    axios.get(`http://127.0.0.1:8000/get_data/${emailId}`)
      .then(response => {
        setEmailDetails(response.data);
        setShowDialog(true);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching email details:', error);
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    axios.post('http://127.0.0.1:8000/create_po', emailDetails)
      .then(response => {
        console.log('Email details submitted:', response.data);
        setShowDialog(false);
        alert(response.data)
      })
      .catch(error => {
        console.error('Error submitting email details:', error);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailDetails({ ...emailDetails, [e.target.name]: e.target.value });
  };


return (
    <div className="p-4">
        <div>
            <h1 className="text-2xl font-bold mb-4">Email to PO</h1>
        </div>
      <div className="flex">
        <div className="mr-3">
          {emails.map(email => (
            <div key={email.id} className="mb-2">
              <Button onClick={() => handleProcessClick(email.id)}>
                Email {email.id}
              </Button>
            </div>
          ))}
        </div>
        <div className="">
          {showDialog && (
            <Card>
                <CardHeader>
                    <CardTitle>Email Details</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div>Loading...</div>
                    ):(
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="APAccountRef">APAccountRef:</Label>
                                <Input name="APAccountRef" value={emailDetails.APAccountRef || ''} onChange={handleChange}/>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="VendorRef">VendorRef:</Label>
                                <Input name="VendorRef" value={emailDetails.VendorRef || ''} onChange={handleChange}/>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="ShipTo">ShipTo:</Label>
                                <Input name="ShipTo" value={emailDetails.ShipTo || ''} onChange={handleChange}/>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="TotalAmt">TotalAmt:</Label>
                                <Input name="TotalAmt" value={emailDetails.TotalAmt || ''} onChange={handleChange}/>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                {/* <Label htmlFor="Line">Line:</Label>
                                <Input name="Line" value={emailDetails.Line || ''} onChange={handleChange}/> */}
                                <Label htmlFor="Line">Line:</Label>
                                <Textarea value={emailDetails.Line || ''} name='Line' onChange={handleChange}></Textarea>
                            </div>
                            <Button onClick={handleSubmit}>Submit</Button>
                        </div>
                        
                    )}
                </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailToPO;
