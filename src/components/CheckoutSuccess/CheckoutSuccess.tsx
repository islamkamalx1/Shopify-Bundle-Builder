import { useBundleStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface CheckoutSuccessProps {
  isSuccessOpen: boolean;
  setIsSuccessOpen: React.Dispatch<React.SetStateAction<boolean>>;
  savings: number;
}

export default function CheckoutSuccess(props: CheckoutSuccessProps) {
  const resetConfiguration = useBundleStore(
    (state) => state.resetConfiguration,
  );

  const handleStartOver = () => {
    resetConfiguration();
    props.setIsSuccessOpen(false);
  };

  return (
    <Dialog open={props.isSuccessOpen} onOpenChange={props.setIsSuccessOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-semibold">Order confirmed!</DialogTitle>
          <DialogDescription>
            Your security bundle is on its way. You saved $
            {props.savings.toFixed(2)} on your setup.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="w-full font-semibold" onClick={handleStartOver}>
            Start a new configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
