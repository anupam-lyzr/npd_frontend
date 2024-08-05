import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DialogDemoProps {
  emailId: string;
}

const DialogDemo: FC<DialogDemoProps> = ({ emailId }) => {
  const [ap_account_ref, setAp_account_ref] = useState<string>('');
  const [vendor_ref, setVendor_ref] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    // Fetch initial data for name and username
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/get_PO/${emailId}`);
        if (response.status === 200) {
          const { ap_account_ref, vendor_ref } = response.data;
          setAp_account_ref(ap_account_ref);
          setVendor_ref(vendor_ref);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [emailId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://127.0.0.1:5000/update_PO', {
        emailId,
        ap_account_ref,
        vendor_ref,
      });
      if (response.status === 200) {
        setSuccessMessage('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setSuccessMessage('Failed to update profile.');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{emailId}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{emailId}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ap_account_ref" className="text-right">
                  AP Account Ref:
                </Label>
                <Input
                  id="ap_account_ref"
                  value={ap_account_ref}
                  onChange={(e) => setAp_account_ref(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="vendor_ref" className="text-right">
                  Vendor Ref:
                </Label>
                <Input
                  id="username"
                  value={vendor_ref}
                  onChange={(e) => setVendor_ref(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
            {successMessage && <p className="text-center mt-4">{successMessage}</p>}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogDemo;
