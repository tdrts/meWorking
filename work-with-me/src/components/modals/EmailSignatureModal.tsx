import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface EmailSignatureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmailSignatureModal({
  open,
  onOpenChange,
}: EmailSignatureModalProps) {
  const signatureSnippet = `Jordan Doe · Product Lead
Work with me profile → https://workwith.me/jordan-doe`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Email signature snippet</DialogTitle>
          <DialogDescription>
            Add this snippet to your email signature so teammates can access your Work With Me profile anytime.
          </DialogDescription>
        </DialogHeader>
        <Textarea readOnly rows={4} value={signatureSnippet} />
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
