import React, { useState } from 'react';
import { useTourMan } from '../../context/TourManContext';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  Bot, 
  CheckCheck, 
  User, 
  MapPin, 
  Clock, 
  Smartphone,
  CheckCircle2,
  Phone
} from 'lucide-react';

export const AIConciergeView: React.FC = () => {
  const { chats, sendChatMessage, showToast } = useTourMan();
  const [activeChatId, setActiveChatId] = useState<string>(chats[0]?.id || 'chat-1');
  const [inputText, setInputText] = useState('');
  const [aiAutoResponder, setAiAutoResponder] = useState(true);

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendChatMessage(activeChatId, inputText, 'operator');
    setInputText('');

    // Optional simulated guest acknowledgement after 1.5 seconds
    if (aiAutoResponder) {
      setTimeout(() => {
        sendChatMessage(activeChatId, 'Thank you! See you at the meeting point!', 'guest');
      }, 2000);
    }
  };

  const handleQuickChip = (text: string) => {
    sendChatMessage(activeChatId, text, 'operator');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">AI WhatsApp Concierge</h2>
            <span className="text-[10px] font-bold uppercase bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 px-2 py-0.5 rounded border border-green-500/20 dark:border-green-500/30 flex items-center gap-1">
              <Bot className="w-3.5 h-3.5" />
              AI Assistant Connected
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Automatically answer guest questions regarding meeting points, dress codes, strollers, and delay notices in 30+ languages.
          </p>
        </div>

        {/* AI Toggle */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">Auto-Responder:</span>
          <button
            onClick={() => {
              setAiAutoResponder(!aiAutoResponder);
              showToast(`🤖 AI Auto-Responder is now ${!aiAutoResponder ? 'Active' : 'Paused'}.`);
            }}
            className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center ${
              aiAutoResponder ? 'bg-emerald-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
          </button>
        </div>
      </div>

      {/* WhatsApp Chat UI Layout */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-3 h-[600px]">
        {/* Left: Chat List */}
        <div className="border-r border-slate-200 dark:border-slate-800 flex flex-col h-full bg-slate-50/70 dark:bg-slate-950/60">
          <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Live Guest Inquiries ({chats.length})</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">WhatsApp 2.26</span>
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-slate-200 dark:divide-slate-800/60">
            {chats.map(chat => {
              const isSelected = chat.id === activeChatId;
              return (
                <button
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={`w-full text-left p-4 transition flex items-start gap-3 ${
                    isSelected ? 'bg-blue-50 dark:bg-slate-800/80 border-l-4 border-blue-500' : 'hover:bg-slate-100 dark:hover:bg-slate-800/30'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
                    {chat.guestName.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{chat.guestName}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">{chat.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-blue-600 dark:text-blue-400 truncate font-mono">{chat.bookingRef} • {chat.tourTitle}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 truncate mt-1">{chat.lastMessage}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat View */}
        <div className="md:col-span-2 flex flex-col h-full bg-white dark:bg-slate-900">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600/10 dark:bg-blue-600/30 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 text-sm">
                {activeChat.guestName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{activeChat.guestName}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {activeChat.bookingRef}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activeChat.guestPhone} • {activeChat.tourTitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                AI Auto-Handled ✓
              </span>
            </div>
          </div>

          {/* Messages Flow */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-100/60 dark:bg-slate-950/40">
            {activeChat.messages.map(msg => {
              const isGuest = msg.sender === 'guest';
              const isAI = msg.sender === 'ai';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isGuest ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                      isGuest
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none border border-slate-200 dark:border-slate-700'
                        : isAI
                        ? 'bg-blue-600 text-white rounded-tr-none border border-blue-500'
                        : 'bg-emerald-600 text-white rounded-tr-none'
                    }`}
                  >
                    {isAI && (
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-100 mb-1">
                        <Bot className="w-3 h-3" />
                        <span>TourMan AI Concierge</span>
                      </div>
                    )}
                    <p>{msg.text}</p>
                    <div className="mt-1 flex items-center justify-end gap-1 text-[10px] opacity-80">
                      <span>{msg.time}</span>
                      {!isGuest && <CheckCheck className="w-3.5 h-3.5 text-blue-200" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick reply suggestion chips */}
          <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-950/60 flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase shrink-0">AI Suggestions:</span>
            <button
              onClick={() => handleQuickChip('📍 Meeting Point: Arch of Constantine, North face. Guide Marco is holding the navy TourMan flag!')}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] whitespace-nowrap transition border border-slate-200 dark:border-slate-700 shadow-xs"
            >
              📍 Send Arch of Constantine Pin
            </button>
            <button
              onClick={() => handleQuickChip('🌱 Noted! Dietary requirements (vegetarian/gluten-free) confirmed with our kitchen stops.')}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] whitespace-nowrap transition border border-slate-200 dark:border-slate-700 shadow-xs"
            >
              🌱 Confirm Dietary Options
            </button>
            <button
              onClick={() => handleQuickChip('⏳ No worries! We hold group departures up to 7 minutes. Let us know when you step out of the taxi.')}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] whitespace-nowrap transition border border-slate-200 dark:border-slate-700 shadow-xs"
            >
              ⏳ Late Arrival Grace Period
            </button>
          </div>

          {/* Composer */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type an operator reply or trigger AI response..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition shadow-lg shadow-blue-600/30 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
