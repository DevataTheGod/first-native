import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ChefStackParamList } from '../../navigation/types';

interface Message {
  id: string;
  text: string;
  sender: 'chef' | 'user';
  time: string;
}

export const ChefCommunicationScreen: React.FC = () => {
  const route = useRoute<RouteProp<ChefStackParamList, 'ClientCommunication'>>();
  const navigation = useNavigation();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! I placed an order for the carbonara.', sender: 'user', time: '10:30 AM' },
    { id: '2', text: 'Great! I will start preparing it now.', sender: 'chef', time: '10:32 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'chef',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setNewMessage('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Chat with Client</Text>
        <TouchableOpacity>
          <Ionicons name="call-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === 'chef' ? styles.chefBubble : styles.userBubble]}>
            <Text style={[styles.messageText, item.sender === 'chef' ? styles.chefText : styles.userText]}>
              {item.text}
            </Text>
            <Text style={[styles.messageTime, item.sender === 'chef' ? styles.chefTime : styles.userTime]}>
              {item.time}
            </Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
          placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Ionicons name="send" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: { ...typography.h3, color: colors.text },
  messagesList: { padding: spacing.lg },
  messageBubble: {
    maxWidth: '80%',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  chefBubble: { alignSelf: 'flex-end', backgroundColor: colors.primary },
  userBubble: { alignSelf: 'flex-start', backgroundColor: colors.card },
  messageText: { ...typography.body, marginBottom: spacing.xs },
  chefText: { color: colors.white },
  userText: { color: colors.text },
  messageTime: { ...typography.caption, textAlign: 'right' },
  chefTime: { color: 'rgba(255,255,255,0.7)' },
  userTime: { color: colors.textMuted },
  inputContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.text,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
