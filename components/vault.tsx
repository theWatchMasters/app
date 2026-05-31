import { router } from "expo-router";
import { Pressable } from "react-native";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function Vault() {
    return (
        <Pressable onPress={() => router.navigate("/vault/new")}>
            <Card className="rounded-[10vw] w-[80vw] h-[80vw] items-center justify-center border-primary border-[3px] shadow-lg shadow-primary/50">
                <CardHeader className="items-center">
                    <CardTitle className="text-5xl">$0.00</CardTitle>
                    <CardDescription className="text-xl">Click to start a new task</CardDescription>
                </CardHeader>
            </Card>
        </Pressable >
    );
}