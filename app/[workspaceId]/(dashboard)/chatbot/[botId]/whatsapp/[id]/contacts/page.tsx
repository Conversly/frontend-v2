'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { IntegrationSidebar } from '@/components/chatbot/integration';
import { getIntegrationSidebarItems } from '@/lib/constants/integrations';
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
import {
    Upload,
    Plus,
    MoreHorizontal,
    Search,
    ChevronDown
} from 'lucide-react';
import { CsvImportDialog } from '@/components/chatbot/whatsapp/CsvImportDialog';
import { toast } from 'sonner';
import { useCreateContact } from '@/services/contacts';
import {
    useContactsError,
    useContactsFetchFirstPage,
    useContactsFetchNextPage,
    useContactsHasMore,
    useContactsItems,
    useContactsLoading,
    useContactsSetQuery,
} from '@/store/contacts-infinite';

export default function WhatsAppContactsPage() {
    const routeParams = useParams<{ workspaceId: string; botId: string; id: string }>();
    const workspaceId = Array.isArray(routeParams.workspaceId) ? routeParams.workspaceId[0] : routeParams.workspaceId;
    const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
    const integrationId = Array.isArray(routeParams.id) ? routeParams.id[0] : routeParams.id;

    const sidebarItems = getIntegrationSidebarItems('whatsapp');
    const basePath = `/${workspaceId}/chatbot/${botId}/whatsapp/${integrationId}`;

    // Cursor-pagination state (Zustand)
    const contacts = useContactsItems();
    const isLoading = useContactsLoading();
    const hasMore = useContactsHasMore();
    const error = useContactsError();
    const setQuery = useContactsSetQuery();
    const fetchFirstPage = useContactsFetchFirstPage();
    const fetchNextPage = useContactsFetchNextPage();

    // Mutation (create contact)
    const { mutateAsync: createContact, isPending: isAdding } = useCreateContact();

    // Add Contact State
    const [isAddContactOpen, setIsAddContactOpen] = useState(false);
    const [newContact, setNewContact] = useState({ name: '', phone: '', email: '' });

    // Import Dialog State
    const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

    // Search state (debounced)
    const [searchInput, setSearchInput] = useState('');
    const debouncedSearch = useMemo(() => searchInput.trim(), [searchInput]);

    // Scroll root + sentinel for infinite loading
    const scrollRootRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);

    // Set query context + fetch page 1 (reset) whenever chatbotId/search changes.
    useEffect(() => {
        if (!botId) return;
        setQuery({ chatbotId: botId, search: debouncedSearch || undefined });
        void fetchFirstPage();
    }, [botId, debouncedSearch, setQuery, fetchFirstPage]);

    // Toast errors (store resets the page state; we just surface it)
    useEffect(() => {
        if (!error) return;
        toast.error(error);
    }, [error]);

    // Auto-fill: if first page doesn't fill the scroll container, keep fetching.
    useEffect(() => {
        const root = scrollRootRef.current;
        if (!root) return;
        if (isLoading || !hasMore || contacts.length === 0) return;

        // If the content doesn't overflow yet, fetch next page to fill the viewport.
        if (root.scrollHeight <= root.clientHeight) {
            void fetchNextPage();
        }
    }, [contacts.length, isLoading, hasMore, fetchNextPage]);

    // IntersectionObserver infinite scroll
    useEffect(() => {
        const root = scrollRootRef.current;
        const target = sentinelRef.current;
        if (!root || !target) return;
        if (!hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    void fetchNextPage();
                }
            },
            {
                root,
                rootMargin: '200px 0px',
                threshold: 0,
            }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [fetchNextPage, hasMore]);

    const handleAddContact = async () => {
        if (!newContact.phone) return;
        try {
            await createContact({
                chatbotId: botId,
                phoneNumber: newContact.phone,
                displayName: newContact.name,
                email: newContact.email,
            });
            setIsAddContactOpen(false);
            setNewContact({ name: '', phone: '', email: '' });
            toast.success("Contact added successfully");
            void fetchFirstPage();
        } catch (error) {
            console.error("Failed to add contact", error);
            toast.error("Failed to add contact");
        }
    };

    return (
        <div className="flex h-full">
            <IntegrationSidebar
                platform="whatsapp"
                items={sidebarItems}
                basePath={basePath}
            />

            <div className="flex-1 flex flex-col overflow-hidden bg-background">
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
                <div ref={scrollRootRef} className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-6xl mx-auto space-y-6">

                        {/* Quick Guide Banner */}
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-slate-800 mb-2">Quick Guide</h4>
                            <p className="text-slate-600 mb-6">Import contact, create audience & launch campaign, all from one place.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Import Card */}
                                <div
                                    onClick={() => setIsImportDialogOpen(true)}
                                    className="bg-white border border-slate-200 rounded-lg p-4 cursor-pointer hover:border-green-500 hover:shadow-sm transition-all flex items-center gap-4 group"
                                >
                                    <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-100 transition-colors">
                                        <Upload className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h5 className="font-medium text-slate-800 group-hover:text-green-700 transition-colors">Import Contacts</h5>
                                        <p className="text-sm text-slate-500">Import up to 2 lakh contacts in one go</p>
                                    </div>
                                </div>

                                {/* Tutorial Card */}
                                <div className="bg-white border border-slate-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:shadow-sm transition-all flex items-center gap-4 group relative overflow-hidden">
                                    <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 pl-0.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                    </div>
                                    <div>
                                        <h5 className="font-medium text-slate-800 group-hover:text-blue-700 transition-colors">Watch Tutorial</h5>
                                        <p className="text-sm text-slate-500">Learn how to manage audiences</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions Toolbar */}
                        <div className="flex items-center justify-between bg-background p-4 rounded-lg border shadow-sm">
                            <div className="flex items-center gap-4">
                                <span className="text-xl font-bold text-slate-700">{contacts.length}</span>
                                <div className="h-6 w-px bg-border"></div>
                                <div className="relative w-64">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        placeholder="Search name or phone..."
                                        className="pl-9 h-9"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
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
                                        <DropdownMenuItem onSelect={() => setIsImportDialogOpen(true)}>
                                            Upload CSV
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>Import from Google Sheets</DropdownMenuItem>
                                        <DropdownMenuItem>Paste Numbers</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        {/* Import Dialog */}
                        <CsvImportDialog
                            open={isImportDialogOpen}
                            onOpenChange={setIsImportDialogOpen}
                            chatbotId={botId}
                            onSuccess={() => {
                                toast.success("Import processing in background");
                                void fetchFirstPage();
                            }}
                        />

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
                                    {isLoading && contacts.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Loading contacts...</TableCell>
                                        </TableRow>
                                    ) : contacts.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No contacts found.</TableCell>
                                        </TableRow>
                                    ) : (
                                        <>
                                            {contacts.map((contact) => (
                                                <TableRow key={contact.id} className="hover:bg-muted/50">
                                                    <TableCell>
                                                        <Checkbox />
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        <div className="flex items-center gap-2">
                                                            {contact.displayName || 'Unknown'}
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
                                            ))}

                                            {isLoading && (
                                                <TableRow>
                                                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                                                        Loading more...
                                                    </TableCell>
                                                </TableRow>
                                            )}

                                            {!hasMore && (
                                                <TableRow>
                                                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                                                        End of results
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </>
                                    )}
                                </TableBody>
                            </Table>
                            <div className="p-4 border-t text-center text-xs text-muted-foreground">
                                Showing {contacts.length} contacts
                            </div>
                            <div ref={sentinelRef} className="h-px w-full" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

