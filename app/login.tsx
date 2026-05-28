import { Platform, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
    return <SafeAreaProvider>
        <View className="h-full w-full dark:bg-slate-900 bg-blue-100">
            <SafeAreaView>
                <View className="dark:bg-blue-500 bg-blue-300 text-center m-2 p-2">
                    <Text className="text-6xl text-center leading-[5re\]" style={{
                        fontFamily: Platform.select({
                            android: 'Inter_900Black',
                            ios: 'Inter-Black',
                        }),
                    }}>
                        Login
                    </Text>
                    <TextInput placeholder="Email..." keyboardType="email-address" autoComplete="email" className="m-2 p-2 border-sky-700 rounded border-solid border" />
                    <TextInput placeholder="Password..." autoComplete="new-password" secureTextEntry={true} className="m-2 p-2 border-sky-700 rounded border-solid border" />

                </View>
            </SafeAreaView>
        </View>
    </SafeAreaProvider>
}