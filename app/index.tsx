import { useSession } from "@/components/auth/SessionContext";
import { Text, View } from "react-native";

export default function Index() {
  const session = useSession();
  return (
    <View
      className="items-center justify-center"
    >
      <Text>I am {session.session.signed_in ? "" : "not "}signed in.</Text>
    </View>
  );
}
