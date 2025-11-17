'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { IntegrationSidebar } from '@/components/chatbot/integration';
import { getIntegrationSidebarItems } from '@/lib/constants/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Search, MessageCircle, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { getWhatsAppChats, WhatsAppContact, addWhatsAppContact } from '@/lib/api/whatsapp';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';


export default function WhatsAppChatsPage() {
  const routeParams = useParams<{ botId: string; id: string }>();
  const router = useRouter();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
  const integrationId = Array.isArray(routeParams.id) ? routeParams.id[0] : routeParams.id;

  interface ContactWithMetadata extends WhatsAppContact {
    lastMessage?: string;
    lastMessageTime?: Date;
    unreadCount?: number;
  }

  const [contacts, setContacts] = useState<ContactWithMetadata[]>([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddContactDialog, setShowAddContactDialog] = useState(false);
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const [isAddingContact, setIsAddingContact] = useState(false);

  const sidebarItems = getIntegrationSidebarItems('whatsapp');
  const basePath = `/chatbot/${botId}/integration/whatsapp/${integrationId}`;

  useEffect(() => {
    const fetchContacts = async () => {
      if (!botId || !integrationId) return;
      
      setIsLoadingContacts(true);
      try {
        const contactsData = await getWhatsAppChats(botId, integrationId);
        setContacts(contactsData.map(contact => ({
          ...contact,
          lastMessage: '',
          lastMessageTime: new Date(),
          unreadCount: 0,
        })));
      } catch (error: any) {
        toast.error('Failed to load contacts: ' + (error.message || 'Unknown error'));
        console.error('Error fetching contacts:', error);
      } finally {
        setIsLoadingContacts(false);
      }
    };

    fetchContacts();
  }, [botId, integrationId]);

  const filteredContacts = contacts.filter(contact =>
    contact.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phoneNumber.includes(searchQuery)
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const handleContactClick = (contact: ContactWithMetadata) => {
    // Navigate to individual chat page
    router.push(`${basePath}/chats/${contact.id}`);
  };

  const handleAddContact = async () => {
    if (!newContactPhone.trim()) {
      toast.error('Phone number is required');
      return;
    }

    // Validate phone number format - accepts numbers without + prefix
    // Remove all non-digit characters (spaces, dashes, parentheses, plus signs, etc.)
    const cleanPhone = newContactPhone.replace(/\D/g, '');
    
    // Double-check: ensure it contains only digits
    if (!/^\d+$/.test(cleanPhone)) {
      toast.error('Phone number must contain only digits');
      return;
    }
    
    // Validate: should be 10-15 digits (typical phone number length)
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      toast.error('Please enter a valid phone number (10-15 digits)');
      return;
    }

    // Check if it starts with 0 (invalid for international format)
    if (cleanPhone.startsWith('0')) {
      toast.error('Phone number should not start with 0');
      return;
    }

    setIsAddingContact(true);
    try {
      // Final validation: ensure phoneNumber is a string containing only digits (0-9)
      // This is the final check before sending to API
      const phoneNumberDigitsOnly = String(cleanPhone).replace(/[^0-9]/g, '');
      
      // Verify it's still valid after final cleanup
      if (!/^[0-9]+$/.test(phoneNumberDigitsOnly)) {
        toast.error('Phone number must contain only digits');
        return;
      }
      
      // Call API to add contact - send without + prefix, digits only
      const newContact = await addWhatsAppContact(botId, integrationId, {
        phoneNumber: phoneNumberDigitsOnly,
        displayName: newContactName.trim() || undefined,
      });
      
      toast.success('Contact added successfully');
      setShowAddContactDialog(false);
      setNewContactPhone('');
      setNewContactName('');
      
      // Refresh contacts list
      const contactsData = await getWhatsAppChats(botId, integrationId);
      setContacts(contactsData.map(contact => ({
        ...contact,
        lastMessage: '',
        lastMessageTime: new Date(),
        unreadCount: 0,
      })));
    } catch (error: any) {
      toast.error('Failed to add contact: ' + (error.message || 'Unknown error'));
      console.error('Error adding contact:', error);
    } finally {
      setIsAddingContact(false);
    }
  };

  return (
    <div className="flex h-full">
      {/* WhatsApp Sidebar - Left Side */}
      <IntegrationSidebar
        platform="whatsapp"
        items={sidebarItems}
        basePath={basePath}
        onClose={() => router.push(`/chatbot/${botId}/integration`)}
      />

      {/* Main Content - Contacts List */}
      <div className="flex-1 flex flex-col">
        {/* Contacts List Header */}
        <div className="h-16 border-b flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-foreground">WhatsApp Chats</h2>
          <Dialog open={showAddContactDialog} onOpenChange={setShowAddContactDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
                <DialogDescription>
                  Add a new WhatsApp contact to start messaging. Enter the phone number with country code (without + prefix).
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
                  <Input
                    id="phone"
                    placeholder="918435271074"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    disabled={isAddingContact}
                    type="tel"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter phone number with country code (e.g., 918435271074 for India, 1234567890 for US)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name (Optional)</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    disabled={isAddingContact}
                  />
                  <p className="text-xs text-muted-foreground">
                    A friendly name for this contact
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddContactDialog(false);
                    setNewContactPhone('');
                    setNewContactName('');
                  }}
                  disabled={isAddingContact}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddContact}
                  disabled={isAddingContact || !newContactPhone.trim()}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
                >
                  {isAddingContact ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    'Add Contact'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="p-4 border-b bg-card/30">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Contacts List */}
        <ScrollArea className="flex-1">
          {isLoadingContacts ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageCircle className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No contacts found</p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => handleContactClick(contact)}
                  className="w-full p-4 hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-semibold flex-shrink-0 shadow-sm">
                      {contact.displayName?.[0] || contact.phoneNumber[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold truncate text-foreground">
                          {contact.displayName || contact.phoneNumber}
                        </h3>
                        {contact.lastMessageTime && (
                          <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                            {formatTime(contact.lastMessageTime)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-muted-foreground truncate">
                          {contact.lastMessage || 'No messages yet'}
                        </p>
                        {contact.unreadCount && contact.unreadCount > 0 && (
                          <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5 flex-shrink-0 ml-2">
                            {contact.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}

