import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    padding: 10,
  },
  chatList: {
    flex: 1,
    marginBottom: 10,
  },
  userBubble: {
    backgroundColor: "#FFD60A",
    alignSelf: "flex-end",
    padding: 12,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "75%",
  },
  botBubble: {
    backgroundColor: "#222",
    alignSelf: "flex-start",
    padding: 12,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "75%",
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#1A1A1A",
    flex: 1,
    borderRadius: 10,
    padding: 12,
    color: "#fff",
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#FFD60A",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  sendButtonText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
});
