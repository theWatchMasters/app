import { useSession } from "@/components/auth/SessionContext";
import { NewTaskForm } from "@/components/new-task";
import { router } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function VaultNewPage() {
    const session = useSession();
    useEffect(() => {
        if (!session.session.signed_in) {
            router.replace("/login");
        }
    }, [session]);
    return <SafeAreaProvider> 
        <SafeAreaView className="flex justify-center items-center h-[100vh] w-full p-5">
            <NewTaskForm />
        </SafeAreaView>
    </SafeAreaProvider>
}