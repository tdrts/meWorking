import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ExportModal } from "./ExportModal";
import { EmailSignatureModal } from "./EmailSignatureModal";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareModal({ open, onOpenChange }: ShareModalProps) {
  const [showExport, setShowExport] = useState(false);
  const [showSignature, setShowSignature] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share your Work With Me profile</DialogTitle>
            <DialogDescription>
              Generate a public link you can share with teammates, partners, or AI copilots.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Shareable link
              </label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value="https://workwith.me/your-profile"
                />
                <Button variant="outline">Copy</Button>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Button variant="outline" onClick={() => setShowExport(true)}>
                Export options
              </Button>
              <Button variant="outline" onClick={() => setShowSignature(true)}>
                Email signature snippet
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ExportModal open={showExport} onOpenChange={setShowExport} />
      <EmailSignatureModal
        open={showSignature}
        onOpenChange={setShowSignature}
      />
    </>
  );
}
