import { IMessagePart, IComapiConfig, IConversationParticipant } from "@comapi/sdk-js-foundation";
export interface IStatusUpdates {
    [profileId: string]: {
        status: string;
        on: string;
    };
}
/**
 *
 */
export interface IChatMessage {
    id: string;
    conversationId: string;
    senderId: string;
    senderName?: string;
    senderAvatarUrl?: string;
    sentOn: string;
    sentEventId: number;
    metadata?: any;
    parts: IMessagePart[];
    statusUpdates?: IStatusUpdates;
}
/**
 *
 */
export interface IChatConversation {
    id: string;
    name: string;
    description?: string;
    roles: any;
    isPublic: boolean;
    earliestLocalEventId?: number;
    latestLocalEventId?: number;
    latestRemoteEventId?: number;
    continuationToken?: number;
    eTag?: string;
    lastMessageTimestamp?: string;
}
/**
 * Aggregate of all entities needed to render a detail view
 */
export interface IChatConversationInfo {
    conversation: IChatConversation;
    messages?: IChatMessage[];
    participants?: IConversationParticipant[];
}
/**
 *
 */
export interface IComapiChatConfig extends IComapiConfig {
    conversationStore: IConversationStore;
    eventPageSize: number;
    messagePageSize: number;
    lazyLoadThreshold: number;
    maxEventGap: number;
    getConversationSleepTimeout?: number;
    getConversationMaxRetry?: number;
    autoSynchronize: boolean;
}
/**
 *
 */
export interface IConversationStore {
    getConversations(): Promise<IChatConversation[]>;
    getConversation(conversationId: string): Promise<IChatConversation>;
    createConversation(conversation: IChatConversation): Promise<boolean>;
    updateConversation(conversation: IChatConversation): Promise<boolean>;
    deleteConversation(conversationId: string): Promise<boolean>;
    deleteConversationMessages(conversationId: string): Promise<boolean>;
    reset(): Promise<boolean>;
    getMessage(conversationId: string, messageId: string): Promise<IChatMessage>;
    updateMessageStatus(conversationId: string, messageId: string, profileId: string, status: string, timestamp: string): Promise<boolean>;
    createMessage(message: IChatMessage): Promise<boolean>;
    getMessages(conversationId: string): Promise<IChatMessage[]>;
}
