import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { useChatStore, ChatMessage } from '../../store/chatStore';
import { UserStackParamList } from '../../navigation/types';

export const UserChatScreen: React.FC = () => {
  const route = useRoute<RouteProp<UserStackParamList, 'Chat'>>();
  const navigation = useNavigation<any>();
  const { messages, addMessage, getMessages } = useChatStore();
  const [text, setText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const orderId = route.params?.orderId || 'default';
  const orderMessages = getMessages(orderId);

  const handleSend = () => {
    if (!text.trim()) return;
    addMessage(orderId, {
      orderId,
      senderId: 'user-1',
      senderType: 'user',
      text: text.trim(),
    });
    setText('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Chat with Chef</Text>
        <Ionicons name="call-outline" size={24} color={colors.text} />
      </View>
      <FlatList
        ref={flatListRef}
        data={orderMessages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.senderType === 'user' ? styles.userBubble : styles.chefBubble]}>
            <Text style={[styles.bubbleText, item.senderType === 'user' ? styles.userText : styles.chefText]}>{item.text}</Text>
            <Text style={[styles.timeText, item.senderType === 'user' ? styles.userTime : styles.chefTime]}>
              {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        )}
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={text}
            onChangeText={setText}
            placeholderTextColor={colors.textMuted}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, !text.trim() && styles.sendBtnDisabled]}
            onPress={handleSend}
            disabled={!text.trim()}
          >
            <Ionicons name="send" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  messagesList: { padding: spacing.lg, flexGrow: 1 },
  bubble: { maxWidth: '80%', padding: spacing.md, borderRadius: borderRadius.md, marginBottom: spacing.md },
  userBubble: { alignSelf: 'flex-end', backgroundColor: colors.primary },
  chefBubble: { alignSelf: 'flex-start', backgroundColor: colors.card },
  bubbleText: { ...typography.body },
  userText: { color: colors.white },
  chefText: { color: colors.text },
  timeText: { ...typography.caption, marginTop: spacing.xs, textAlign: 'right' },
  userTime: { color: 'rgba(255,255,255,0.7)' },
  chefTime: { color: colors.textMuted },
  inputContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.text,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    maxHeight: 100,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  sendBtnDisabled: { backgroundColor: colors.textMuted },
});
