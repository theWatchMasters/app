import { router } from "expo-router";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Text } from "../ui/text";

export default function PaymentStub({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
    const onChange = () => {
        router.navigate("/");
        setOpen(false);
    }
    return <Dialog open={open} onOpenChange={onChange}>
        <DialogContent>
            <DialogHeader>

                <DialogTitle>
                    This is a temporary payment stub.
                </DialogTitle>
                <DialogDescription>
                    In the future, this will be replaced with a Stripe integration that allows you to pay for the time you have spent on your task. For now, you can click the button below to simulate a successful payment and complete your task.
                </DialogDescription>
            </DialogHeader>
            <Button onPress={onChange}>
                <Text>
                    Continue
                </Text>
            </Button>
        </DialogContent>
    </Dialog>
}