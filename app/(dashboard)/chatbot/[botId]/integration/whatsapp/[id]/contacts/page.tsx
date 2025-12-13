'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IntegrationSidebar } from '@/components/chatbot/integration';
import { getIntegrationSidebarItems } from '@/lib/constants/integrations';
import { getWhatsAppContactsList } from '@/lib/api/whatsapp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { addWhatsAppContact } from '@/lib/api/whatsapp';
import {
    Users,
    Upload,
    Plus,
    MoreHorizontal,
    Download,
    Filter,
    Search,
    MessageSquare,
    ChevronDown
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function WhatsAppContactsPage() {
    const routeParams = useParams<{ botId: string; id: string }>();
    const router = useRouter();
    const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
    const integrationId = Array.isArray(routeParams.id) ? routeParams.id[0] : routeParams.id;

    const sidebarItems = getIntegrationSidebarItems('whatsapp');
    const basePath = `/chatbot/${botId}/integration/whatsapp/${integrationId}`;

    // Mock Data
    const [contacts, setContacts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Add Contact State
    const [isAddContactOpen, setIsAddContactOpen] = useState(false);
    const [newContact, setNewContact] = useState({ name: '', phone: '', email: '' });
    const [isAdding, setIsAdding] = useState(false);

    const handleAddContact = async () => {
        if (!newContact.phone) return;
        setIsAdding(true);
        try {
            await addWhatsAppContact(botId, integrationId, {
                phoneNumber: newContact.phone,
                displayName: newContact.name,
                email: newContact.email
            });
            // Refresh contacts
            const data = await getWhatsAppContactsList(botId);
            setContacts(data);
            setIsAddContactOpen(false);
            setNewContact({ name: '', phone: '', email: '' });
        } catch (error) {
            console.error("Failed to add contact", error);
        } finally {
            setIsAdding(false);
        }
    };

    useEffect(() => {
        const loadContacts = async () => {
            setIsLoading(true);
            try {
                const data = await getWhatsAppContactsList(botId);
                setContacts(data);
            } catch (error) {
                console.error("Failed to load contacts", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadContacts();
    }, [botId]);


    return (
        <div className="flex h-full">
            <IntegrationSidebar
                platform="whatsapp"
                items={sidebarItems}
                basePath={basePath}
                onClose={() => router.push(`/chatbot/${botId}/integration`)}
            />

            <div className="flex-1 overflow-y-auto bg-background">
                {/* Header */}
                <div className="h-16 border-b bg-background flex items-center justify-between px-6 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-semibold">Contacts</h1>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Quality Rating:</span>
                            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">High</Badge>
                        </div>
                        <div className="w-px h-4 bg-border"></div>
                        <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Remaining Quota:</span>
                            <span className="font-medium">UNLIMITED</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-6">
                    <div className="max-w-6xl mx-auto space-y-6">

                        {/* Quick Guide Banner */}
                        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100">
                            <CardContent className="p-6 flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
                                        <h3 className="font-medium">Introducing AI-powered Magic on Contacts</h3>
                                    </div>
                                    <p className="text-sm text-green-800">Generate tags and segment users automatically based on their behavior.</p>
                                    <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1"><Upload className="w-3 h-3" /> Import up to 2 lakh contacts</span>
                                        <span className="flex items-center gap-1 cursor-pointer hover:underline text-primary">Watch Tutorial</span>
                                    </div>
                                </div>
                                <Button className="bg-green-600 hover:bg-green-700 text-white">
                                    Try AI Magic
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Actions Toolbar */}
                        <div className="flex items-center justify-between bg-background p-4 rounded-lg border shadow-sm">
                            <div className="flex items-center gap-4">
                                <span className="text-xl font-bold text-slate-700">{contacts.length}</span>
                                <div className="h-6 w-px bg-border"></div>
                                <div className="relative w-64">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search name or phone..." className="pl-9 h-9" />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button variant="default" className="bg-slate-800 text-white hover:bg-slate-700">
                                    Broadcast
                                </Button>
                                <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="gap-2">
                                            <Plus className="w-4 h-4" /> Add Contact
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Add Contact</DialogTitle>
                                            <DialogDescription>
                                                Add a new contact to your WhatsApp audience.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                    Name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    value={newContact.name}
                                                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="phone" className="text-right">
                                                    Phone <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    id="phone"
                                                    value={newContact.phone}
                                                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                                                    className="col-span-3"
                                                    placeholder="e.g. 15551234567"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="email" className="text-right">
                                                    Email
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={newContact.email}
                                                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                                                    className="col-span-3"
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button onClick={handleAddContact} disabled={isAdding}>
                                                {isAdding ? "Adding..." : "Add Contact"}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="gap-2">
                                            Import <ChevronDown className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>Upload CSV</DropdownMenuItem>
                                        <DropdownMenuItem>Import from Google Sheets</DropdownMenuItem>
                                        <DropdownMenuItem>Paste Numbers</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button variant="outline" className="gap-2">
                                    Action <ChevronDown className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Contacts Table */}
                        <div className="bg-background rounded-lg border shadow-sm overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50">
                                        <TableHead className="w-12">
                                            <Checkbox />
                                        </TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Mobile Number</TableHead>
                                        <TableHead>Date of Birth</TableHead>
                                        <TableHead>Tags</TableHead>
                                        <TableHead>Source</TableHead>
                                        <TableHead className="w-12"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Loading contacts...</TableCell>
                                        </TableRow>
                                    ) : contacts.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No contacts found.</TableCell>
                                        </TableRow>
                                    ) : (
                                        contacts.map((contact) => (
                                            <TableRow key={contact.id} className="hover:bg-muted/50">
                                                <TableCell>
                                                    <Checkbox />
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        {contact.displayName || contact.name || 'Unknown'}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{contact.phoneNumber}</TableCell>
                                                <TableCell className="text-muted-foreground">-</TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className="font-normal text-xs bg-slate-100 text-slate-600 hover:bg-slate-200">
                                                        -
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-xs text-muted-foreground font-medium">
                                                    {contact.userMetadata?.source || 'WhatsApp'}
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                            <div className="p-4 border-t text-center text-xs text-muted-foreground">
                                Showing 8 contacts
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
